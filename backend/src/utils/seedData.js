/**
 * Seed script - populates the database with realistic sample data so the
 * application can be demoed/tested immediately after setup.
 *
 * Usage:  npm run seed
 * (Reads MONGO_URI from .env just like the main server.)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const run = async () => {
  await connectDB();

  console.log('[seed] Clearing existing collections...');
  await Promise.all([User.deleteMany(), Category.deleteMany(), Product.deleteMany()]);

  console.log('[seed] Creating demo users...');
  const admin = await User.create({
    name: 'Asha Rao',
    email: 'admin@stockpilot.io',
    password: 'Admin@123',
    role: 'admin',
  });

  await User.create({
    name: 'Vikram Shah',
    email: 'staff@stockpilot.io',
    password: 'Staff@123',
    role: 'staff',
  });

  console.log('[seed] Creating categories...');
  const categories = await Category.insertMany([
    { name: 'Electronics', description: 'Consumer electronics and accessories' },
    { name: 'Office Supplies', description: 'Stationery and office equipment' },
    { name: 'Warehouse Equipment', description: 'Tools and equipment used in the warehouse' },
    { name: 'Packaging', description: 'Boxes, tape, and shipping materials' },
  ]);

  const byName = (name) => categories.find((c) => c.name === name)._id;

  console.log('[seed] Creating products...');
  await Product.insertMany([
    {
      name: 'Wireless Barcode Scanner',
      sku: 'ELEC-BC-001',
      category: byName('Electronics'),
      description: 'Bluetooth handheld barcode scanner, 2.4GHz, USB dock included',
      price: 89.99,
      quantity: 42,
      reorderLevel: 15,
      supplier: 'ScanTech Industries',
      warehouseLocation: 'A1-03',
      createdBy: admin._id,
    },
    {
      name: 'Thermal Label Printer',
      sku: 'ELEC-PR-002',
      category: byName('Electronics'),
      description: '4-inch direct thermal label printer for shipping labels',
      price: 219.5,
      quantity: 8,
      reorderLevel: 10,
      supplier: 'PrintFast Corp',
      warehouseLocation: 'A1-05',
      createdBy: admin._id,
    },
    {
      name: 'A4 Copy Paper (Ream)',
      sku: 'OFF-PP-010',
      category: byName('Office Supplies'),
      description: '500 sheets, 80gsm, bright white',
      price: 4.25,
      quantity: 320,
      reorderLevel: 50,
      supplier: 'PaperCo',
      warehouseLocation: 'B2-01',
      createdBy: admin._id,
    },
    {
      name: 'Ballpoint Pens (Box of 50)',
      sku: 'OFF-PN-011',
      category: byName('Office Supplies'),
      description: 'Medium point, black ink',
      price: 12.0,
      quantity: 60,
      reorderLevel: 20,
      supplier: 'WriteWell Ltd',
      warehouseLocation: 'B2-02',
      createdBy: admin._id,
    },
    {
      name: 'Heavy Duty Pallet Jack',
      sku: 'WHS-PJ-020',
      category: byName('Warehouse Equipment'),
      description: '5500 lb capacity, 48x27 inch forks',
      price: 385.0,
      quantity: 6,
      reorderLevel: 2,
      supplier: 'LiftPro Equipment',
      warehouseLocation: 'C3-01',
      createdBy: admin._id,
    },
    {
      name: 'Industrial Shelving Unit',
      sku: 'WHS-SH-021',
      category: byName('Warehouse Equipment'),
      description: '5-tier steel shelving, 72x36x18 inch',
      price: 149.99,
      quantity: 3,
      reorderLevel: 5,
      supplier: 'LiftPro Equipment',
      warehouseLocation: 'C3-02',
      createdBy: admin._id,
    },
    {
      name: 'Corrugated Shipping Boxes (Medium)',
      sku: 'PKG-BX-030',
      category: byName('Packaging'),
      description: '18x14x12 inch, bundle of 25',
      price: 32.5,
      quantity: 150,
      reorderLevel: 40,
      supplier: 'BoxWorks',
      warehouseLocation: 'D4-01',
      createdBy: admin._id,
    },
    {
      name: 'Packing Tape (Case of 36)',
      sku: 'PKG-TP-031',
      category: byName('Packaging'),
      description: '2 inch clear packing tape rolls',
      price: 45.0,
      quantity: 18,
      reorderLevel: 20,
      supplier: 'BoxWorks',
      warehouseLocation: 'D4-02',
      createdBy: admin._id,
    },
  ]);

  console.log('[seed] Done! Demo credentials:');
  console.log('        admin@stockpilot.io / Admin@123');
  console.log('        staff@stockpilot.io / Staff@123');

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
