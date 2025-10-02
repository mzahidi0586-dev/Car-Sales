import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// ...existing code...
import { generateInvoicePDF } from "./InvoicePDF";
const logo = "/logo.png";
import * as React from "react";
// VAT default rate
const DEFAULT_VAT_RATE = 0.2;
import { useState, useMemo } from 'react';
import { Search, Car, TrendingUp, Package, ShoppingCart, Receipt, Calendar, Plus, X, FileText, Download } from 'lucide-react';
const VehicleStockApp = () => {
    var _a, _b, _c;
    // ...existing code...
    // VAT registration state
    const [vatRegistered, setVatRegistered] = useState(() => loadLS('vatRegistered', false));
    const [vatRate, setVatRate] = useState(() => loadLS('vatRate', DEFAULT_VAT_RATE));
    React.useEffect(() => { saveLS('vatRegistered', vatRegistered); }, [vatRegistered]);
    React.useEffect(() => { saveLS('vatRate', vatRate); }, [vatRate]);
    const [activeTab, setActiveTab] = useState('inventory');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMake, setFilterMake] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('make');
    const [showSaleModal, setShowSaleModal] = useState(false);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [showInventoryModal, setShowInventoryModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    // LocalStorage helpers
    function loadLS(key, fallback) {
        try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : fallback;
        }
        catch (_a) {
            return fallback;
        }
    }
    function saveLS(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }
    const [vehicles, setVehicles] = useState(() => loadLS('vehicles', [
        { id: 1, make: 'Toyota', model: 'Camry', year: 2023, stock: 12, price: 28500, costPrice: 25000, additionalCosts: 0, status: 'in-stock', vin: 'JT2BF28K5X0123456', mileage: 12000 },
        { id: 2, make: 'Honda', model: 'Civic', year: 2024, stock: 8, price: 24900, costPrice: 22000, additionalCosts: 0, status: 'in-stock', vin: 'JHMFC36278X012345', mileage: 8000 },
        { id: 3, make: 'Ford', model: 'F-150', year: 2023, stock: 15, price: 42000, costPrice: 38000, additionalCosts: 0, status: 'in-stock', vin: '1FTEW1EP8MFA12345', mileage: 15000 },
        { id: 4, make: 'Tesla', model: 'Model 3', year: 2024, stock: 3, price: 45000, costPrice: 41000, additionalCosts: 0, status: 'low-stock', vin: '5YJ3E1EA9LF012345', mileage: 5000 },
        { id: 5, make: 'BMW', model: '3 Series', year: 2023, stock: 6, price: 48900, costPrice: 44000, additionalCosts: 0, status: 'in-stock', vin: 'WBA8E5C52NA012345', mileage: 10000 }
    ]));
    const [sales, setSales] = useState(() => loadLS('sales', [
        {
            id: 1,
            invoiceNumber: 'INV-2025-001',
            vehicleId: 1,
            vehicle: 'Toyota Camry 2023',
            customer: 'John Smith',
            customerEmail: 'john.smith@email.com',
            customerPhone: '07700 900123',
            customerAddress: '123 High Street, London, SW1A 1AA',
            salePrice: 29500,
            date: '2025-09-15',
            salesPerson: 'Mike Johnson',
            documentationFee: 99,
            registrationFee: 55,
            extras: [{ name: '12-Month Warranty', price: 295 }, { name: 'Floor Mats', price: 35 }],
            tradeInDescription: '',
            tradeInValue: 0,
            discountNote: '',
            discountValue: 0,
            paymentMethod: 'Bank Transfer',
            deposit: 0,
            useFinance: false,
            apr: 0,
            termMonths: 0,
            notes: '',
            terms: `TERMS & CONDITIONS OF SALE\n\n1. Definitions\nSeller means HNS Car Sales Ltd. Customer/Buyer means the person purchasing the vehicle. Vehicle means the used motor vehicle described in this invoice.\n\n2. Condition of Vehicle\nThe Vehicle is sold as a used vehicle; age-related wear is to be expected. No representation is made beyond information provided in good faith unless expressly stated in writing.\n\n3. Inspection & Test Drive\nCustomer has had the opportunity to inspect/test-drive and accepts the Vehicle's condition.\n\n4. Price & Payment\nDeposit (if any) is non-refundable unless the Seller cannot supply the Vehicle. Full cleared funds required before release.\n\n5. Title & Risk\nTitle passes on receipt of full cleared payment. Risk passes on collection/delivery.\n\n6. Collection & Delivery\nUnless agreed in writing, Customer collects from Seller's premises. Any delivery is at Customer's cost and risk.\n\n7. Warranty\nWhere a warranty is provided, its duration/scope/exclusions are in a separate schedule. Warranty Claim – Customer Responsibility: in the event of a warranty claim, the Customer is responsible for transporting the Vehicle to the Seller's designated yard/service location for inspection/repair; all transport costs/risks are borne by the Customer unless otherwise agreed in writing. Normal wear/consumables/misuse/accident damage excluded.\n\n8. Part-Exchange (if applicable)\nCustomer warrants full title and disclosure of known defects; allowance may be adjusted if undisclosed issues are found.\n\n9. Finance\nCustomer is responsible for complying with any finance agreement terms.\n\n10. Limitation of Liability\nNothing limits liability for death/personal injury due to negligence or fraud. Seller not liable for indirect/consequential losses (loss of profit/downtime).\n\n11. Data Protection\nCustomer data processed to complete the sale and provide after-sales support in accordance with applicable law.\n\n12. Governing Law\nThese terms are governed by the laws of England & Wales and subject to the exclusive jurisdiction of the English courts.`
        }
    ]));
    const [expenses, setExpenses] = useState(() => loadLS('expenses', [
        { id: 1, category: 'Rent', amount: 8500, date: '2025-09-01', description: 'Monthly showroom rent', linkedToStock: false, vehicleId: null },
        { id: 2, category: 'Utilities', amount: 1200, date: '2025-09-05', description: 'Electricity and water', linkedToStock: false, vehicleId: null }
    ]));
    // Persist to localStorage on change
    React.useEffect(() => { saveLS('vehicles', vehicles); }, [vehicles]);
    React.useEffect(() => { saveLS('sales', sales); }, [sales]);
    React.useEffect(() => { saveLS('expenses', expenses); }, [expenses]);
    const [newVehicle, setNewVehicle] = useState({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        stock: 1,
        price: '',
        costPrice: '',
        vin: '',
        mileage: ''
    });
    const [newSale, setNewSale] = useState({
        vehicleId: '',
        customer: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        salePrice: '',
        date: new Date().toISOString().split('T')[0],
        salesPerson: '',
        documentationFee: 99,
        registrationFee: 55,
        extras: [{ name: '12-Month Warranty', price: 295 }, { name: 'Floor Mats', price: 35 }],
        tradeInDescription: '',
        tradeInValue: 0,
        discountNote: '',
        discountValue: 0,
        paymentMethod: 'Bank Transfer',
        deposit: 0,
        useFinance: false,
        apr: 0,
        termMonths: 0,
        notes: '',
        terms: `TERMS & CONDITIONS OF SALE\n\n1. Definitions\nSeller means HNS Car Sales Ltd. Customer/Buyer means the person purchasing the vehicle. Vehicle means the used motor vehicle described in this invoice.\n\n2. Condition of Vehicle\nThe Vehicle is sold as a used vehicle; age-related wear is to be expected. No representation is made beyond information provided in good faith unless expressly stated in writing.\n\n3. Inspection & Test Drive\nCustomer has had the opportunity to inspect/test-drive and accepts the Vehicle's condition.\n\n4. Price & Payment\nDeposit (if any) is non-refundable unless the Seller cannot supply the Vehicle. Full cleared funds required before release.\n\n5. Title & Risk\nTitle passes on receipt of full cleared payment. Risk passes on collection/delivery.\n\n6. Collection & Delivery\nUnless agreed in writing, Customer collects from Seller's premises. Any delivery is at Customer's cost and risk.\n\n7. Warranty\nWhere a warranty is provided, its duration/scope/exclusions are in a separate schedule. Warranty Claim – Customer Responsibility: in the event of a warranty claim, the Customer is responsible for transporting the Vehicle to the Seller's designated yard/service location for inspection/repair; all transport costs/risks are borne by the Customer unless otherwise agreed in writing. Normal wear/consumables/misuse/accident damage excluded.\n\n8. Part-Exchange (if applicable)\nCustomer warrants full title and disclosure of known defects; allowance may be adjusted if undisclosed issues are found.\n\n9. Finance\nCustomer is responsible for complying with any finance agreement terms.\n\n10. Limitation of Liability\nNothing limits liability for death/personal injury due to negligence or fraud. Seller not liable for indirect/consequential losses (loss of profit/downtime).\n\n11. Data Protection\nCustomer data processed to complete the sale and provide after-sales support in accordance with applicable law.\n\n12. Governing Law\nThese terms are governed by the laws of England & Wales and subject to the exclusive jurisdiction of the English courts.`,
        vat: '', // VAT amount for sale
    });
    const [newExpense, setNewExpense] = useState({
        category: 'Rent',
        amount: '', // keep as string for input compatibility
        date: new Date().toISOString().split('T')[0],
        description: '',
        linkedToStock: false,
        vehicleId: '',
        vat: '' // VAT amount for expense
    });
    const makes = ['all', ...Array.from(new Set(vehicles.map((v) => v.make)))];
    const generalExpenseCategories = ['Rent', 'Utilities', 'Salaries', 'Marketing', 'Insurance', 'Supplies', 'Other'];
    const stockExpenseCategories = ['Fuel', 'Travel', 'Parts', 'Paint', 'Labour', 'Repairs', 'Maintenance'];
    const generateInvoiceNumber = () => {
        const year = new Date().getFullYear();
        const nextNum = sales.length + 1;
        return 'INV-' + year + '-' + String(nextNum).padStart(3, '0');
    };
    const handleAddVehicle = () => {
        if (!newVehicle.make || !newVehicle.model || !newVehicle.year || !newVehicle.price || !newVehicle.costPrice || !newVehicle.vin || !newVehicle.mileage) {
            alert('Please fill in all fields');
            return;
        }
        const stock = Number(newVehicle.stock);
        let status = 'in-stock';
        if (stock === 0)
            status = 'out-of-stock';
        else if (stock <= 3)
            status = 'low-stock';
        const vehicle = {
            id: vehicles.length + 1,
            make: newVehicle.make,
            model: newVehicle.model,
            year: Number(newVehicle.year),
            stock: stock,
            price: parseFloat(newVehicle.price),
            costPrice: parseFloat(newVehicle.costPrice),
            additionalCosts: 0,
            status: status,
            vin: newVehicle.vin,
            mileage: parseInt(newVehicle.mileage)
        };
        setVehicles([...vehicles, vehicle]);
        setShowInventoryModal(false);
        setNewVehicle({
            make: '',
            model: '',
            year: new Date().getFullYear(),
            stock: 1,
            price: '',
            costPrice: '',
            vin: '',
            mileage: ''
        });
    };
    const handleAddSale = () => {
        // Basic validation
        if (!newSale.vehicleId)
            return alert('Please select a vehicle');
        if (!newSale.customer)
            return alert('Please enter customer name');
        if (!newSale.customerEmail)
            return alert('Please enter customer email');
        if (!newSale.customerPhone)
            return alert('Please enter customer phone');
        if (!newSale.customerAddress)
            return alert('Please enter customer address');
        if (!newSale.salePrice)
            return alert('Please enter sale price');
        if (!newSale.salesPerson)
            return alert('Please enter sales person name');
        const vehicle = vehicles.find((v) => v.id === parseInt(newSale.vehicleId));
        if (!vehicle)
            return alert('Vehicle not found');
        // Calculate VAT if enabled
        let saleVAT = 0;
        if (vatRegistered) {
            saleVAT = newSale.vat ? parseFloat(newSale.vat) : ((parseFloat(newSale.salePrice || '0') + Number(newSale.documentationFee) + Number(newSale.registrationFee)) * vatRate);
        }
        const sale = {
            id: sales.length + 1,
            invoiceNumber: generateInvoiceNumber(),
            vehicleId: parseInt(newSale.vehicleId),
            vehicle: vehicle.make + ' ' + vehicle.model + ' ' + vehicle.year,
            customer: newSale.customer,
            customerEmail: newSale.customerEmail,
            customerPhone: newSale.customerPhone,
            customerAddress: newSale.customerAddress,
            salePrice: parseFloat(newSale.salePrice),
            vat: saleVAT,
            date: newSale.date,
            salesPerson: newSale.salesPerson,
            documentationFee: newSale.documentationFee,
            registrationFee: newSale.registrationFee,
            extras: newSale.extras,
            tradeInDescription: newSale.tradeInDescription,
            tradeInValue: newSale.tradeInValue,
            discountNote: newSale.discountNote,
            discountValue: newSale.discountValue,
            paymentMethod: newSale.paymentMethod,
            deposit: newSale.deposit,
            useFinance: newSale.useFinance,
            apr: newSale.apr,
            termMonths: newSale.termMonths,
            notes: newSale.notes,
            terms: newSale.terms
        };
        setSales([...sales, sale]);
        // Decrement vehicle stock
        setVehicles(vehicles.map((v) => {
            if (v.id === parseInt(newSale.vehicleId)) {
                const newStock = v.stock - 1;
                return Object.assign(Object.assign({}, v), { stock: newStock, status: newStock === 0 ? 'out-of-stock' : v.status });
            }
            return v;
        }));
        setShowSaleModal(false);
        setNewSale({
            vehicleId: '',
            customer: '',
            customerEmail: '',
            customerPhone: '',
            customerAddress: '',
            salePrice: '',
            date: new Date().toISOString().split('T')[0],
            salesPerson: '',
            documentationFee: 99,
            registrationFee: 55,
            extras: [{ name: '12-Month Warranty', price: 295 }, { name: 'Floor Mats', price: 35 }],
            tradeInDescription: '',
            tradeInValue: 0,
            discountNote: '',
            discountValue: 0,
            paymentMethod: 'Bank Transfer',
            deposit: 0,
            useFinance: false,
            apr: 0,
            termMonths: 0,
            notes: '',
            terms: '',
            vat: ''
        });
        alert('Sale added successfully!');
    };
    const handleAddExpense = () => {
        if (!newExpense.category || !newExpense.amount || !newExpense.description) {
            alert('Please fill in all fields');
            return;
        }
        if (newExpense.linkedToStock && !newExpense.vehicleId) {
            alert('Please select a vehicle for stock-related expenses');
            return;
        }
        // Calculate VAT if enabled
        let expenseVAT = 0;
        if (vatRegistered) {
            expenseVAT = newExpense.vat ? parseFloat(newExpense.vat) : (parseFloat(newExpense.amount || '0') * vatRate);
        }
        const expense = {
            id: expenses.length + 1,
            category: newExpense.category,
            amount: parseFloat(newExpense.amount),
            vat: expenseVAT,
            date: newExpense.date,
            description: newExpense.description,
            linkedToStock: newExpense.linkedToStock,
            vehicleId: newExpense.linkedToStock ? parseInt(newExpense.vehicleId) : null
        };
        setExpenses([...expenses, expense]);
        if (newExpense.linkedToStock && newExpense.vehicleId) {
            setVehicles(vehicles.map((v) => {
                if (v.id === parseInt(newExpense.vehicleId)) {
                    return Object.assign(Object.assign({}, v), { additionalCosts: v.additionalCosts + parseFloat(newExpense.amount) });
                }
                return v;
            }));
        }
        setShowExpenseModal(false);
        setNewExpense({
            category: 'Rent',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            description: '',
            linkedToStock: false,
            vehicleId: '',
            vat: ''
        });
    };
    const viewInvoice = (sale) => {
        setSelectedSale(sale);
        setShowInvoiceModal(true);
    };
    const filteredVehicles = useMemo(() => {
        let filtered = vehicles;
        if (searchTerm) {
            filtered = filtered.filter((v) => v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                v.vin.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (filterMake !== 'all') {
            filtered = filtered.filter((v) => v.make === filterMake);
        }
        if (filterStatus !== 'all') {
            filtered = filtered.filter((v) => v.status === filterStatus);
        }
        return filtered.sort((a, b) => {
            if (sortBy === 'make')
                return a.make.localeCompare(b.make);
            if (sortBy === 'price')
                return a.price - b.price;
            if (sortBy === 'stock')
                return b.stock - a.stock;
            return 0;
        });
    }, [searchTerm, filterMake, filterStatus, sortBy, vehicles]);
    const totalStock = vehicles.reduce((sum, v) => sum + v.stock, 0);
    const totalSales = sales.reduce((sum, s) => sum + s.salePrice, 0);
    const totalSalesVAT = vatRegistered ? sales.reduce((sum, s) => sum + (s.vat || 0), 0) : 0;
    const totalExpensesVAT = vatRegistered ? expenses.reduce((sum, e) => sum + (e.vat || 0), 0) : 0;
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    // Calculate total cost of sold vehicles (exclude additionalCosts)
    const totalSoldVehicleCost = sales.reduce((sum, s) => {
        const v = vehicles.find((veh) => veh.id === s.vehicleId);
        return sum + (v ? (v.costPrice || 0) : 0);
    }, 0);
    const profit = totalSales - totalSoldVehicleCost - totalExpenses;
    const getStatusColor = (status) => {
        if (status === 'in-stock')
            return 'bg-green-100 text-green-800';
        if (status === 'low-stock')
            return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };
    const getStatusDot = (status) => {
        if (status === 'in-stock')
            return 'bg-green-500';
        if (status === 'low-stock')
            return 'bg-yellow-500';
        return 'bg-red-500';
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "max-w-7xl mx-auto px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: vatRegistered, onChange: e => setVatRegistered(e.target.checked) }), _jsx("span", { className: "font-medium", children: "Dealer is VAT Registered" })] }), vatRegistered && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "VAT Rate:" }), _jsx("input", { type: "number", step: "0.01", min: "0", max: "1", value: vatRate, onChange: e => setVatRate(Number(e.target.value)), className: "w-20 px-2 py-1 border rounded" }), _jsx("span", { children: "(e.g. 0.2 for 20%)" })] }))] }) }), _jsx("div", { className: "bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-6 shadow-lg", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(Car, { size: 32 }), _jsx("h1", { className: "text-3xl font-bold", children: "Dealership Management" })] }), _jsx("p", { className: "text-blue-100", children: "Manage inventory, track sales, and monitor expenses" })] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8", children: [vatRegistered && (_jsx("div", { className: "bg-white p-6 rounded-lg shadow", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-500 text-sm font-medium", children: "VAT on Sales" }), _jsxs("p", { className: "text-2xl font-bold text-blue-600 mt-1", children: ["\u00A3", totalSalesVAT.toLocaleString(undefined, { minimumFractionDigits: 2 })] }), _jsx("p", { className: "text-gray-500 text-sm font-medium mt-2", children: "VAT on Expenses" }), _jsxs("p", { className: "text-2xl font-bold text-red-600 mt-1", children: ["\u00A3", totalExpensesVAT.toLocaleString(undefined, { minimumFractionDigits: 2 })] })] }), _jsx(FileText, { className: "text-blue-600", size: 32 })] }) })), _jsx("div", { className: "bg-white p-6 rounded-lg shadow", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-500 text-sm font-medium", children: "Total Units" }), _jsx("p", { className: "text-3xl font-bold text-gray-900 mt-1", children: totalStock })] }), _jsx(Package, { className: "text-blue-600", size: 32 })] }) }), _jsx("div", { className: "bg-white p-6 rounded-lg shadow", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-500 text-sm font-medium", children: "Total Sales" }), _jsxs("p", { className: "text-3xl font-bold text-green-600 mt-1", children: ["\u00A3", (totalSales / 1000).toFixed(0), "K"] })] }), _jsx(ShoppingCart, { className: "text-green-600", size: 32 })] }) }), _jsx("div", { className: "bg-white p-6 rounded-lg shadow", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-500 text-sm font-medium", children: "Expenses" }), _jsxs("p", { className: "text-3xl font-bold text-red-600 mt-1", children: ["\u00A3", (totalExpenses / 1000).toFixed(1), "K"] })] }), _jsx(Receipt, { className: "text-red-600", size: 32 })] }) }), _jsx("div", { className: "bg-white p-6 rounded-lg shadow", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-500 text-sm font-medium", children: "Net Profit" }), _jsxs("p", { className: 'text-3xl font-bold mt-1 ' + (profit >= 0 ? 'text-green-600' : 'text-red-600'), children: ["\u00A3", (profit / 1000).toFixed(1), "K"] })] }), _jsx(TrendingUp, { className: profit >= 0 ? 'text-green-600' : 'text-red-600', size: 32 })] }) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [_jsx("div", { className: "border-b border-gray-200", children: _jsxs("div", { className: "flex", children: [_jsx("button", { onClick: () => setActiveTab('inventory'), className: 'px-6 py-3 font-medium ' + (activeTab === 'inventory' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'), children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Package, { size: 18 }), "Inventory"] }) }), _jsx("button", { onClick: () => setActiveTab('sales'), className: 'px-6 py-3 font-medium ' + (activeTab === 'sales' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'), children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ShoppingCart, { size: 18 }), "Sales"] }) }), _jsx("button", { onClick: () => setActiveTab('expenses'), className: 'px-6 py-3 font-medium ' + (activeTab === 'expenses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'), children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Receipt, { size: 18 }), "Expenses"] }) }), _jsx("button", { onClick: () => setActiveTab('expenseReport'), className: 'px-6 py-3 font-medium ' + (activeTab === 'expenseReport' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'), children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FileText, { size: 18 }), "Expense Report"] }) }), _jsx("button", { onClick: () => setActiveTab('salesReport'), className: 'px-6 py-3 font-medium ' + (activeTab === 'salesReport' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'), children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { size: 18 }), "Sales Report"] }) })] }) }), activeTab === 'inventory' && (_jsxs("div", { children: [_jsxs("div", { className: "p-6 border-b border-gray-200", children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "text", placeholder: "Search by make, model, or VIN...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsx("select", { value: filterMake, onChange: (e) => setFilterMake(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: makes.map((make) => (_jsx("option", { value: make, children: make === 'all' ? 'All Makes' : make }, make))) }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "in-stock", children: "In Stock" }), _jsx("option", { value: "low-stock", children: "Low Stock" }), _jsx("option", { value: "out-of-stock", children: "Out of Stock" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: "make", children: "Sort by Make" }), _jsx("option", { value: "price", children: "Sort by Price" }), _jsx("option", { value: "stock", children: "Sort by Stock" })] })] }), _jsxs("button", { onClick: () => setShowInventoryModal(true), className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2", children: [_jsx(Plus, { size: 18 }), "Add Vehicle"] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b border-gray-200", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Vehicle" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "VRN" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Year" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Mileage" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Sale Price" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Cost" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Add Costs" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Stock" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredVehicles.map((vehicle) => (_jsxs("tr", { className: "hover:bg-gray-50 transition", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx(Car, { className: "text-blue-600", size: 20 }) }), _jsxs("div", { className: "ml-4", children: [_jsx("div", { className: "text-sm font-medium text-gray-900", children: vehicle.make }), _jsx("div", { className: "text-sm text-gray-500", children: vehicle.model })] })] }) }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [_jsx("div", { className: "text-sm text-gray-500 font-mono", children: vehicle.vin }), " "] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "text-sm text-gray-900", children: vehicle.year }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "text-sm text-gray-900", children: [vehicle.mileage.toLocaleString(), " mi"] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "text-sm font-medium text-gray-900", children: ["\u00A3", vehicle.price.toLocaleString()] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "text-sm text-gray-600", children: ["\u00A3", vehicle.costPrice.toLocaleString()] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "text-sm font-medium text-orange-600", children: ["\u00A3", vehicle.additionalCosts.toLocaleString()] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "text-sm font-bold text-gray-900", children: [vehicle.stock, " units"] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("span", { className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ' + getStatusColor(vehicle.status), children: [_jsx("span", { className: 'w-2 h-2 rounded-full mr-1.5 ' + getStatusDot(vehicle.status) }), vehicle.status.replace('-', ' ')] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("button", { className: "px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs", onClick: () => {
                                                                        if (window.confirm('Remove this vehicle from inventory?')) {
                                                                            setVehicles(vehicles.filter((v) => v.id !== vehicle.id));
                                                                        }
                                                                    }, children: "Remove" }) })] }, vehicle.id))) })] }) })] })), activeTab === 'sales' && (_jsxs("div", { children: [_jsxs("div", { className: "p-6 border-b border-gray-200 flex flex-col gap-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Recent Sales" }), _jsxs("button", { onClick: () => setShowSaleModal(true), className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2", children: [_jsx(Plus, { size: 18 }), "Add Sale"] })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center justify-between", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg shadow flex flex-col gap-1", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Total Sales" }), _jsxs("span", { className: "text-2xl font-bold text-green-600", children: ["\u00A3", sales.reduce((sum, s) => sum + (s.salePrice || 0), 0).toLocaleString()] }), _jsx("span", { className: "text-sm text-gray-500", children: "Total Invoices" }), _jsx("span", { className: "text-lg font-bold text-blue-600", children: sales.length })] }), _jsxs("button", { onClick: () => {
                                                            const csvRows = [
                                                                ['Invoice', 'Date', 'Vehicle', 'Customer', 'Sales Person', 'Sale Price'],
                                                                ...sales.map(s => [
                                                                    s.invoiceNumber,
                                                                    new Date(s.date).toLocaleDateString(),
                                                                    s.vehicle,
                                                                    s.customer,
                                                                    s.salesPerson,
                                                                    s.salePrice
                                                                ])
                                                            ];
                                                            const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
                                                            const encodedUri = encodeURI(csvContent);
                                                            const link = document.createElement('a');
                                                            link.setAttribute('href', encodedUri);
                                                            link.setAttribute('download', 'sales_report.csv');
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            document.body.removeChild(link);
                                                        }, className: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2", children: [_jsx(FileText, { size: 18 }), "Export to CSV"] })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b border-gray-200", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Invoice" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Vehicle" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Customer" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Sales Person" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Sale Price" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: sales.map((sale) => (_jsxs("tr", { className: "hover:bg-gray-50 transition", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "text-sm font-mono text-blue-600", children: sale.invoiceNumber }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center text-sm text-gray-900", children: [_jsx(Calendar, { size: 16, className: "mr-2 text-gray-400" }), new Date(sale.date).toLocaleDateString()] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "text-sm font-medium text-gray-900", children: sale.vehicle }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "text-sm text-gray-900", children: sale.customer }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "text-sm text-gray-500", children: sale.salesPerson }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "text-sm font-bold text-green-600", children: ["\u00A3", sale.salePrice.toLocaleString()] }) }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap flex gap-2", children: [_jsxs("button", { onClick: () => viewInvoice(sale), className: "text-blue-600 hover:text-blue-800 flex items-center gap-1", children: [_jsx(FileText, { size: 16 }), _jsx("span", { className: "text-sm", children: "View Invoice" })] }), _jsx("button", { className: "px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs", onClick: () => {
                                                                            if (window.confirm('Remove this sale?')) {
                                                                                setSales(sales.filter(s => s.id !== sale.id));
                                                                            }
                                                                        }, children: "Remove" })] })] }, sale.id))) })] }) })] })), activeTab === 'expenses' && (_jsxs("div", { children: [_jsxs("div", { className: "p-6 border-b border-gray-200 flex flex-col gap-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Business Expenses" }), _jsxs("button", { onClick: () => setShowExpenseModal(true), className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2", children: [_jsx(Plus, { size: 18 }), "Add Expense"] })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center justify-between", children: [_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg shadow flex flex-col gap-1", children: [_jsx("span", { className: "text-sm text-gray-500", children: "Total Expenses" }), _jsxs("span", { className: "text-2xl font-bold text-red-600", children: ["\u00A3", expenses.reduce((sum, e) => sum + (e.amount || 0), 0).toLocaleString()] }), _jsx("span", { className: "text-sm text-gray-500", children: "Total Records" }), _jsx("span", { className: "text-lg font-bold text-blue-600", children: expenses.length })] }), _jsxs("button", { onClick: () => {
                                                            const csvRows = [
                                                                ['Date', 'Category', 'Description', 'Linked Vehicle', 'Amount', 'VAT'],
                                                                ...expenses.map(e => {
                                                                    var _a, _b;
                                                                    return [
                                                                        new Date(e.date).toLocaleDateString(),
                                                                        e.category,
                                                                        e.description,
                                                                        e.vehicleId ? (((_a = vehicles.find((v) => v.id === e.vehicleId)) === null || _a === void 0 ? void 0 : _a.make) + ' ' + ((_b = vehicles.find((v) => v.id === e.vehicleId)) === null || _b === void 0 ? void 0 : _b.model)) : 'General',
                                                                        e.amount,
                                                                        e.vat || ''
                                                                    ];
                                                                })
                                                            ];
                                                            const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
                                                            const encodedUri = encodeURI(csvContent);
                                                            const link = document.createElement('a');
                                                            link.setAttribute('href', encodedUri);
                                                            link.setAttribute('download', 'expenses_report.csv');
                                                            document.body.appendChild(link);
                                                            link.click();
                                                            document.body.removeChild(link);
                                                        }, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2", children: [_jsx(FileText, { size: 18 }), "Export to CSV"] })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50 border-b border-gray-200", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Category" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Linked Vehicle" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Amount" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: expenses.map((expense) => {
                                                        const linkedVehicle = expense.vehicleId ? vehicles.find((v) => v.id === expense.vehicleId) : null;
                                                        return (_jsxs("tr", { className: "hover:bg-gray-50 transition", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center text-sm text-gray-900", children: [_jsx(Calendar, { size: 16, className: "mr-2 text-gray-400" }), new Date(expense.date).toLocaleDateString()] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ' + (expense.linkedToStock ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'), children: expense.category }) }), _jsx("td", { className: "px-6 py-4", children: _jsx("div", { className: "text-sm text-gray-900", children: expense.description }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: linkedVehicle ? (_jsxs("div", { className: "text-sm text-gray-900", children: [linkedVehicle.make, " ", linkedVehicle.model] })) : (_jsx("div", { className: "text-sm text-gray-400", children: "General" })) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "text-sm font-bold text-red-600", children: ["\u00A3", expense.amount.toLocaleString()] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("button", { className: "px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs", onClick: () => {
                                                                            if (window.confirm('Remove this expense?')) {
                                                                                setExpenses(expenses.filter(e => e.id !== expense.id));
                                                                            }
                                                                        }, children: "Remove" }) })] }, expense.id));
                                                    }) })] }) }), _jsx("div", { className: "p-6 bg-gray-50 border-t border-gray-200", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-lg font-semibold text-gray-900", children: "Total Expenses" }), _jsxs("span", { className: "text-2xl font-bold text-red-600", children: ["\u00A3", totalExpenses.toLocaleString()] })] }) })] }))] })] }), showInventoryModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white rounded-lg max-w-md w-full p-6 max-h-screen overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Add New Vehicle" }), _jsx("button", { onClick: () => setShowInventoryModal(false), className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { size: 24 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Make" }), _jsx("input", { type: "text", value: newVehicle.make, onChange: (e) => setNewVehicle(Object.assign(Object.assign({}, newVehicle), { make: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Toyota" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Model" }), _jsx("input", { type: "text", value: newVehicle.model, onChange: (e) => setNewVehicle(Object.assign(Object.assign({}, newVehicle), { model: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Camry" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Year" }), _jsx("input", { type: "number", value: newVehicle.year, onChange: (e) => setNewVehicle(Object.assign(Object.assign({}, newVehicle), { year: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "2024" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "VIN" }), _jsx("input", { type: "text", value: newVehicle.vin, onChange: (e) => setNewVehicle(Object.assign(Object.assign({}, newVehicle), { vin: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "1HGBH41JXMN109186" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Cost Price (Purchase)" }), _jsx("input", { type: "number", value: newVehicle.costPrice, onChange: (e) => setNewVehicle(Object.assign(Object.assign({}, newVehicle), { costPrice: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "25000" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sale Price" }), _jsx("input", { type: "number", value: newVehicle.price, onChange: (e) => setNewVehicle(Object.assign(Object.assign({}, newVehicle), { price: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "28500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Stock Quantity" }), _jsx("input", { type: "number", value: newVehicle.stock, onChange: (e) => setNewVehicle(Object.assign(Object.assign({}, newVehicle), { stock: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "1", min: "0" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Mileage" }), _jsx("input", { type: "number", value: newVehicle.mileage, onChange: (e) => setNewVehicle(Object.assign(Object.assign({}, newVehicle), { mileage: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "12000", min: "0" })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { onClick: handleAddVehicle, className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium", children: "Add Vehicle" }), _jsx("button", { onClick: () => setShowInventoryModal(false), className: "flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium", children: "Cancel" })] })] })] }) })), showSaleModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white rounded-lg max-w-2xl w-full p-6 max-h-screen overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Add New Sale" }), _jsx("button", { onClick: () => setShowSaleModal(false), className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { size: 24 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Vehicle" }), _jsxs("select", { value: newSale.vehicleId, onChange: (e) => setNewSale(Object.assign(Object.assign({}, newSale), { vehicleId: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: "", children: "Select a vehicle" }), vehicles.filter((v) => v.stock > 0).map((v) => (_jsxs("option", { value: v.id, children: [v.make, " ", v.model, " ", v.year, " - \u00A3", v.price.toLocaleString()] }, v.id)))] })] }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Customer Details" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Customer Name" }), _jsx("input", { type: "text", value: newSale.customer, onChange: (e) => setNewSale(Object.assign(Object.assign({}, newSale), { customer: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "John Doe" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), _jsx("input", { type: "email", value: newSale.customerEmail, onChange: (e) => setNewSale(Object.assign(Object.assign({}, newSale), { customerEmail: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "john@email.com" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone" }), _jsx("input", { type: "tel", value: newSale.customerPhone, onChange: (e) => setNewSale(Object.assign(Object.assign({}, newSale), { customerPhone: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "07700 900123" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Address" }), _jsx("textarea", { value: newSale.customerAddress, onChange: (e) => setNewSale(Object.assign(Object.assign({}, newSale), { customerAddress: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "123 High Street, London, SW1A 1AA", rows: 2 })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sale Price" }), _jsx("input", { type: "number", value: newSale.salePrice, onChange: (e) => setNewSale(Object.assign(Object.assign({}, newSale), { salePrice: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "25000" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sales Person" }), _jsx("input", { type: "text", value: newSale.salesPerson, onChange: (e) => setNewSale(Object.assign(Object.assign({}, newSale), { salesPerson: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Mike Johnson" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }), _jsx("input", { type: "date", value: newSale.date, onChange: (e) => setNewSale(Object.assign(Object.assign({}, newSale), { date: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Documentation Fee (\u00A3)" }), _jsx("input", { type: "number", value: newSale.documentationFee, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { documentationFee: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Registration Fee (\u00A3)" }), _jsx("input", { type: "number", value: newSale.registrationFee, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { registrationFee: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg" })] })] }), vatRegistered && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "VAT on Sale (\u00A3)" }), _jsx("input", { type: "number", value: newSale.vat, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { vat: String(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: `Calculated: £${((parseFloat(newSale.salePrice || '0') + Number(newSale.documentationFee) + Number(newSale.registrationFee)) * vatRate).toFixed(2)}` }), _jsx("small", { className: "text-gray-500", children: "Leave blank to auto-calculate" })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Extras" }), newSale.extras.map((extra, idx) => (_jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { type: "text", value: extra.name, onChange: e => {
                                                        const updated = [...newSale.extras];
                                                        updated[idx].name = e.target.value;
                                                        setNewSale(Object.assign(Object.assign({}, newSale), { extras: updated }));
                                                    }, className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg", placeholder: "Extra name" }), _jsx("input", { type: "number", value: extra.price, onChange: e => {
                                                        const updated = [...newSale.extras];
                                                        updated[idx].price = Number(e.target.value);
                                                        setNewSale(Object.assign(Object.assign({}, newSale), { extras: updated }));
                                                    }, className: "w-24 px-3 py-2 border border-gray-300 rounded-lg", placeholder: "Price" }), _jsx("button", { type: "button", onClick: () => {
                                                        const updated = newSale.extras.filter((_, i) => i !== idx);
                                                        setNewSale(Object.assign(Object.assign({}, newSale), { extras: updated }));
                                                    }, className: "text-red-600", children: "\u2715" })] }, idx))), _jsx("button", { type: "button", onClick: () => setNewSale(Object.assign(Object.assign({}, newSale), { extras: [...newSale.extras, { name: '', price: 0 }] })), className: "text-blue-600 hover:underline", children: "+ Add Extra" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Trade-In Description" }), _jsx("input", { type: "text", value: newSale.tradeInDescription, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { tradeInDescription: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "Description" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Trade-In Value (\u00A3)" }), _jsx("input", { type: "number", value: newSale.tradeInValue, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { tradeInValue: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "-\u00A30" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Discount Note" }), _jsx("input", { type: "text", value: newSale.discountNote, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { discountNote: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "Note" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Discount Value (\u00A3)" }), _jsx("input", { type: "number", value: newSale.discountValue, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { discountValue: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "-\u00A30" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Payment Method" }), _jsxs("select", { value: newSale.paymentMethod, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { paymentMethod: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", children: [_jsx("option", { children: "Bank Transfer" }), _jsx("option", { children: "Card" }), _jsx("option", { children: "Cash" }), _jsx("option", { children: "Finance" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Deposit (\u00A3)" }), _jsx("input", { type: "number", value: newSale.deposit, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { deposit: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "\u00A30" })] })] }), _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("input", { type: "checkbox", id: "useFinance", checked: newSale.useFinance, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { useFinance: e.target.checked })), className: "w-4 h-4" }), _jsx("label", { htmlFor: "useFinance", className: "text-sm font-medium text-gray-700", children: "Use Finance" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "APR (%)" }), _jsx("input", { type: "number", value: newSale.apr, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { apr: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "8.9" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Term (months)" }), _jsx("input", { type: "number", value: newSale.termMonths, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { termMonths: Number(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: "36" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Notes" }), _jsx("textarea", { value: newSale.notes, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { notes: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", rows: 2, placeholder: "All vehicles HPI-clear. Subject to terms & conditions." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Terms & Conditions" }), _jsx("textarea", { value: newSale.terms, onChange: e => setNewSale(Object.assign(Object.assign({}, newSale), { terms: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", rows: 2, placeholder: "Terms & Conditions" })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { onClick: handleAddSale, className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium", children: "Add Sale & Generate Invoice" }), _jsx("button", { onClick: () => setShowSaleModal(false), className: "flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium", children: "Cancel" })] })] })] }) })), showExpenseModal && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white rounded-lg max-w-md w-full p-6 max-h-screen overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Add New Expense" }), _jsx("button", { onClick: () => setShowExpenseModal(false), className: "text-gray-400 hover:text-gray-600", children: _jsx(X, { size: 24 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { children: _jsxs("label", { className: "flex items-center gap-2 mb-3", children: [_jsx("input", { type: "checkbox", checked: newExpense.linkedToStock, onChange: (e) => setNewExpense(Object.assign(Object.assign({}, newExpense), { linkedToStock: e.target.checked, category: e.target.checked ? 'Fuel' : 'Rent' })), className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500" }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: "Link to Vehicle (incremental cost)" })] }) }), newExpense.linkedToStock && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Select Vehicle" }), _jsxs("select", { value: newExpense.vehicleId, onChange: (e) => setNewExpense(Object.assign(Object.assign({}, newExpense), { vehicleId: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: "", children: "Select a vehicle" }), vehicles.map((v) => (_jsxs("option", { value: v.id, children: [v.make, " ", v.model, " ", v.year, " - Current Add Cost: \u00A3", v.additionalCosts.toLocaleString()] }, v.id)))] })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }), _jsx("select", { value: newExpense.category, onChange: (e) => setNewExpense(Object.assign(Object.assign({}, newExpense), { category: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: newExpense.linkedToStock ? (stockExpenseCategories.map(cat => (_jsx("option", { value: cat, children: cat }, cat)))) : (generalExpenseCategories.map(cat => (_jsx("option", { value: cat, children: cat }, cat)))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Amount" }), _jsx("input", { type: "number", value: newExpense.amount, onChange: (e) => setNewExpense(Object.assign(Object.assign({}, newExpense), { amount: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "1500" })] }), vatRegistered && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "VAT on Expense (\u00A3)" }), _jsx("input", { type: "number", value: newExpense.vat, onChange: e => setNewExpense(Object.assign(Object.assign({}, newExpense), { vat: String(e.target.value) })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg", placeholder: `Calculated: £${(parseFloat(newExpense.amount || '0') * vatRate).toFixed(2)}` }), _jsx("small", { className: "text-gray-500", children: "Leave blank to auto-calculate" })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }), _jsx("textarea", { value: newExpense.description, onChange: (e) => setNewExpense(Object.assign(Object.assign({}, newExpense), { description: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", placeholder: "Enter expense details", rows: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }), _jsx("input", { type: "date", value: newExpense.date, onChange: (e) => setNewExpense(Object.assign(Object.assign({}, newExpense), { date: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { onClick: handleAddExpense, className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium", children: "Add Expense" }), _jsx("button", { onClick: () => setShowExpenseModal(false), className: "flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium", children: "Cancel" })] })] })] }) })), showInvoiceModal && selectedSale && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print:static print:bg-transparent print:p-0", children: _jsxs("div", { className: "bg-white rounded-2xl max-w-3xl w-full p-10 shadow-2xl border border-gray-200 max-h-screen overflow-y-auto invoice-modal-print print:max-w-none print:w-full print:rounded-none print:p-0 print:shadow-none print:overflow-visible print:max-h-none print:border-0 print:box-border print:m-0 print:relative", children: [_jsxs("div", { className: "flex items-center justify-between mb-8 print:flex-col print:items-start print:gap-2", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: logo, alt: "Logo", className: "h-12 w-12 rounded-full bg-blue-100 p-2 border border-blue-200" }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-extrabold text-blue-700 tracking-tight print:text-2xl print:mb-1", children: "HNS Cars Ltd" }), _jsx("p", { className: "text-gray-500 font-medium", children: "Roe Hyde Farm, Hatfield AL4 0PJ" }), _jsx("p", { className: "text-gray-500", children: "Phone: 01923 557253" })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 print:text-xl", children: "SALES INVOICE" }), _jsx("p", { className: "text-blue-600 font-semibold mt-1 print:mt-0", children: selectedSale.invoiceNumber }), _jsxs("p", { className: "text-gray-600", children: ["Date: ", new Date(selectedSale.date).toLocaleDateString('en-GB')] })] }), _jsx("button", { onClick: () => setShowInvoiceModal(false), className: "text-gray-400 hover:text-gray-600 print:hidden", children: _jsx(X, { size: 28 }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-8 mb-8 print:gap-4", children: [_jsxs("div", { className: "bg-blue-50 rounded-lg p-6 border border-blue-100", children: [_jsx("h3", { className: "font-semibold text-blue-700 mb-2 print:mb-1 print:text-lg", children: "Bill To" }), _jsx("p", { className: "text-gray-900 font-bold print:text-base", children: selectedSale.customer }), selectedSale.customerAddress.split('\n').map((line, idx) => (_jsx("p", { className: "text-gray-700 print:text-sm", children: line }, idx))), _jsxs("p", { className: "text-gray-700 mt-2 print:mt-0 print:text-sm", children: ["Email: ", selectedSale.customerEmail] }), _jsxs("p", { className: "text-gray-700 print:text-sm", children: ["Phone: ", selectedSale.customerPhone] })] }), _jsxs("div", { className: "bg-white rounded-lg p-6 border border-gray-100", children: [_jsx("h3", { className: "font-semibold text-gray-700 mb-2 print:mb-1 print:text-lg", children: "Details" }), _jsxs("div", { className: "mb-2 text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Sales Person:" }), " ", selectedSale.salesPerson] }), _jsxs("div", { className: "mb-2 text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Payment Method:" }), " ", selectedSale.paymentMethod] }), _jsxs("div", { className: "mb-2 text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Deposit:" }), " \u00A3", selectedSale.deposit] })] })] }), _jsx("div", { className: "rounded-xl overflow-hidden border border-gray-200 shadow mb-8", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-blue-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 text-left font-bold text-blue-700", children: "Item Description" }), _jsx("th", { className: "px-6 py-4 text-right font-bold text-blue-700", children: "Amount" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-100", children: [_jsxs("tr", { className: "bg-white", children: [_jsxs("td", { className: "px-6 py-4", children: [_jsx("div", { className: "font-semibold text-gray-900", children: selectedSale.vehicle }), _jsxs("div", { className: "text-xs text-gray-500", children: ["VRN: ", (_a = vehicles.find((v) => v.id === selectedSale.vehicleId)) === null || _a === void 0 ? void 0 : _a.vin] }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Mileage: ", (_c = (_b = vehicles.find((v) => v.id === selectedSale.vehicleId)) === null || _b === void 0 ? void 0 : _b.mileage) === null || _c === void 0 ? void 0 : _c.toLocaleString(), " mi"] })] }), _jsxs("td", { className: "px-6 py-4 text-right font-semibold text-gray-900", children: ["\u00A3", selectedSale.salePrice.toLocaleString()] })] }), selectedSale.documentationFee > 0 && (_jsxs("tr", { className: "bg-gray-50", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-700", children: "Documentation Fee" }), _jsxs("td", { className: "px-6 py-4 text-right font-medium text-gray-700", children: ["\u00A3", selectedSale.documentationFee] })] })), selectedSale.registrationFee > 0 && (_jsxs("tr", { className: "bg-white", children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-700", children: "Registration Fee" }), _jsxs("td", { className: "px-6 py-4 text-right font-medium text-gray-700", children: ["\u00A3", selectedSale.registrationFee] })] })), selectedSale.extras && selectedSale.extras.length > 0 && selectedSale.extras.filter(extra => extra.price > 0).map((extra, idx) => (_jsxs("tr", { className: idx % 2 === 0 ? 'bg-gray-50' : 'bg-white', children: [_jsx("td", { className: "px-6 py-4 font-medium text-gray-700", children: extra.name }), _jsxs("td", { className: "px-6 py-4 text-right font-medium text-gray-700", children: ["\u00A3", extra.price] })] }, idx))), selectedSale.tradeInValue && selectedSale.tradeInValue > 0 && (_jsxs("tr", { className: "bg-white", children: [_jsx("td", { className: "px-6 py-4 font-medium text-red-600", children: "Trade-In" }), _jsxs("td", { className: "px-6 py-4 text-right font-medium text-red-600", children: ["-\u00A3", selectedSale.tradeInValue] })] })), selectedSale.discountValue && selectedSale.discountValue > 0 && (_jsxs("tr", { className: "bg-white", children: [_jsx("td", { className: "px-6 py-4 font-medium text-red-600", children: "Discount" }), _jsxs("td", { className: "px-6 py-4 text-right font-medium text-red-600", children: ["-\u00A3", selectedSale.discountValue] })] }))] })] }) }), _jsx("div", { className: "flex justify-end mb-8", children: _jsxs("div", { className: "w-80 bg-blue-50 rounded-xl shadow-lg p-6 border border-blue-200", children: [_jsxs("div", { className: "flex justify-between py-2 text-blue-700 font-semibold", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { children: ["\u00A3", selectedSale.salePrice.toLocaleString()] })] }), selectedSale.documentationFee && selectedSale.documentationFee > 0 && (_jsxs("div", { className: "flex justify-between py-2 text-blue-700", children: [_jsx("span", { children: "Documentation Fee" }), _jsxs("span", { children: ["\u00A3", selectedSale.documentationFee] })] })), selectedSale.registrationFee && selectedSale.registrationFee > 0 && (_jsxs("div", { className: "flex justify-between py-2 text-blue-700", children: [_jsx("span", { children: "Registration Fee" }), _jsxs("span", { children: ["\u00A3", selectedSale.registrationFee] })] })), selectedSale.extras && selectedSale.extras.length > 0 && selectedSale.extras.map((extra, idx) => (_jsxs("div", { className: "flex justify-between py-2 text-blue-700", children: [_jsx("span", { children: extra.name }), _jsxs("span", { children: ["\u00A3", extra.price] })] }, idx))), selectedSale.tradeInValue && selectedSale.tradeInValue > 0 && (_jsxs("div", { className: "flex justify-between py-2 text-red-600", children: [_jsx("span", { children: "Trade-In" }), _jsxs("span", { children: ["-\u00A3", selectedSale.tradeInValue] })] })), selectedSale.discountValue && selectedSale.discountValue > 0 && (_jsxs("div", { className: "flex justify-between py-2 text-red-600", children: [_jsx("span", { children: "Discount" }), _jsxs("span", { children: ["-\u00A3", selectedSale.discountValue] })] })), _jsxs("div", { className: "flex justify-between py-3 border-t border-blue-300 text-xl font-bold text-blue-900 mt-2", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["\u00A3", (selectedSale.salePrice +
                                                        (selectedSale.documentationFee || 0) +
                                                        (selectedSale.registrationFee || 0) +
                                                        (selectedSale.extras ? selectedSale.extras.reduce((sum, e) => sum + (e.price || 0), 0) : 0)
                                                        - (selectedSale.tradeInValue || 0)
                                                        - (selectedSale.discountValue || 0)).toLocaleString()] })] })] }) }), _jsxs("div", { className: "mb-8", children: [_jsx("h4", { className: "text-lg font-semibold mb-2 text-blue-700", children: "Payment & Finance" }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4 border border-gray-200 text-gray-700 text-sm", children: [_jsxs("div", { className: "mb-2", children: ["Payment Method: ", selectedSale.paymentMethod] }), _jsxs("div", { className: "mb-2", children: ["Deposit: \u00A3", selectedSale.deposit] }), selectedSale.useFinance && (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-2", children: "Finance: Yes" }), _jsxs("div", { className: "mb-2", children: ["APR: ", selectedSale.apr, "%"] }), _jsxs("div", { className: "mb-2", children: ["Term: ", selectedSale.termMonths, " months"] })] }))] })] }), _jsxs("div", { className: "mb-8", children: [_jsx("h4", { className: "text-lg font-semibold mb-2 text-blue-700", children: "Notes" }), _jsx("div", { className: "bg-gray-50 rounded-lg p-4 border border-gray-200 text-gray-700 text-sm", children: selectedSale.notes || 'All vehicles HPI-clear. Subject to terms & conditions.' })] }), _jsxs("div", { className: "mb-8", children: [_jsx("h4", { className: "text-lg font-semibold mb-2 text-blue-700", children: "Terms & Conditions" }), _jsx("div", { className: "bg-gray-50 rounded-lg p-4 border border-gray-200 text-gray-700 text-xs whitespace-pre-line", children: selectedSale.terms || `TERMS & CONDITIONS OF SALE\n\n1. Definitions\nSeller means HNS Car Sales Ltd. Customer/Buyer means the person purchasing the vehicle. Vehicle means the used motor vehicle described in this invoice.\n\n2. Condition of Vehicle\nThe Vehicle is sold as a used vehicle; age-related wear is to be expected. No representation is made beyond information provided in good faith unless expressly stated in writing.\n\n3. Inspection & Test Drive\nCustomer has had the opportunity to inspect/test-drive and accepts the Vehicle's condition.\n\n4. Price & Payment\nDeposit (if any) is non-refundable unless the Seller cannot supply the Vehicle. Full cleared funds required before release.\n\n5. Title & Risk\nTitle passes on receipt of full cleared payment. Risk passes on collection/delivery.\n\n6. Collection & Delivery\nUnless agreed in writing, Customer collects from Seller's premises. Any delivery is at Customer's cost and risk.\n\n7. Warranty\nWhere a warranty is provided, its duration/scope/exclusions are in a separate schedule. Warranty Claim – Customer Responsibility: in the event of a warranty claim, the Customer is responsible for transporting the Vehicle to the Seller's designated yard/service location for inspection/repair; all transport costs/risks are borne by the Customer unless otherwise agreed in writing. Normal wear/consumables/misuse/accident damage excluded.\n\n8. Part-Exchange (if applicable)\nCustomer warrants full title and disclosure of known defects; allowance may be adjusted if undisclosed issues are found.\n\n9. Finance\nCustomer is responsible for complying with any finance agreement terms.\n\n10. Limitation of Liability\nNothing limits liability for death/personal injury due to negligence or fraud. Seller not liable for indirect/consequential losses (loss of profit/downtime).\n\n11. Data Protection\nCustomer data processed to complete the sale and provide after-sales support in accordance with applicable law.\n\n12. Governing Law\nThese terms are governed by the laws of England & Wales and subject to the exclusive jurisdiction of the English courts.` })] }), _jsxs("div", { className: "mt-8 pt-6 border-t border-gray-200 text-center text-base text-blue-700 font-semibold", children: [_jsx("p", { children: "Customer Signature: ___________________________" }), _jsx("p", { children: "Date: _______________" }), _jsx("p", { className: "mt-4", children: "Thank you for your business!" })] }), _jsxs("div", { className: "flex gap-3 mt-6 print:hidden", children: [_jsxs("button", { onClick: () => {
                                        const modal = document.querySelector('.invoice-modal-print');
                                        if (!modal)
                                            return window.print();
                                        const printContents = modal.innerHTML;
                                        const printWindow = window.open('', '', 'height=900,width=800');
                                        if (printWindow) {
                                            printWindow.document.write('<html><head><title>Invoice</title>');
                                            // Copy all <link rel="stylesheet"> tags from main document to print window
                                            Array.from(document.querySelectorAll('link[rel="stylesheet"]')).forEach(linkTag => {
                                                printWindow.document.write(linkTag.outerHTML);
                                            });
                                            // Copy all <style> tags (Tailwind, custom, etc.)
                                            Array.from(document.querySelectorAll('style')).forEach(styleTag => {
                                                printWindow.document.write(`<style>${styleTag.innerHTML}</style>`);
                                            });
                                            // Fallback: copy all CSS from main document
                                            if (document.styleSheets) {
                                                try {
                                                    for (let sheet of Array.from(document.styleSheets)) {
                                                        if (sheet.cssRules) {
                                                            let css = '';
                                                            for (let rule of Array.from(sheet.cssRules)) {
                                                                css += rule.cssText + '\n';
                                                            }
                                                            printWindow.document.write(`<style>${css}</style>`);
                                                        }
                                                    }
                                                }
                                                catch (e) { /* ignore cross-origin errors */ }
                                            }
                                            printWindow.document.write('</head><body style="margin:0">');
                                            printWindow.document.write(printContents);
                                            printWindow.document.write('</body></html>');
                                            printWindow.document.close();
                                            printWindow.focus();
                                            setTimeout(() => {
                                                printWindow.print();
                                                printWindow.close();
                                            }, 500);
                                        }
                                    }, className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 shadow", children: [_jsx(Download, { size: 18 }), "Print Invoice"] }), _jsxs("button", { onClick: () => generateInvoicePDF(selectedSale, vehicles), className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2 shadow", children: [_jsx(Download, { size: 18 }), "Download PDF"] }), _jsx("button", { onClick: () => setShowInvoiceModal(false), className: "flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium shadow", children: "Close" })] })] }) }))] }));
};
export default VehicleStockApp;
