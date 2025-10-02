import { jsPDF } from "jspdf";
export function generateInvoicePDF(sale, vehicles) {
    var _a;
    console.log('generateInvoicePDF called', sale, vehicles);
    const doc = new jsPDF();
    // Add logo (optional)
    // doc.addImage('/logo.png', 'PNG', 15, 10, 40, 20);
    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 60, 120);
    doc.text("SALES INVOICE", 15, 30);
    doc.setDrawColor(40, 60, 120);
    doc.setLineWidth(0.8);
    doc.line(15, 34, 195, 34);
    // Invoice Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice #: ${sale.invoiceNumber}`, 15, 42);
    const ukDate = new Date(sale.date).toLocaleDateString('en-GB');
    doc.text(`Date: ${ukDate}`, 15, 50);
    doc.text(`Sales Person: ${sale.salesPerson}`, 15, 58);
    // Seller & Buyer Info
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('From:', 15, 68);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('HNS Cars Ltd', 15, 76);
    doc.text('Roe Hyde farm, Hatfield AL4 0PJ', 15, 84);
    doc.text('Phone: 01923 557253', 15, 92);
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('Bill To:', 120, 68);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(sale.customer, 120, 76);
    doc.text(sale.customerAddress, 120, 84);
    doc.text(`Email: ${sale.customerEmail}`, 120, 92);
    doc.text(`Phone: ${sale.customerPhone}`, 120, 100);
    // Invoice Table Section (matches modal)
    let y = 110;
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('Invoice Details', 15, y);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    y += 8;
    // Table rows
    doc.text('Vehicle: ' + sale.vehicle, 15, y);
    doc.text('VIN: ' + (((_a = vehicles.find(v => v.id === sale.vehicleId)) === null || _a === void 0 ? void 0 : _a.vin) || ''), 120, y);
    y += 8;
    doc.text('Sale Price: £' + sale.salePrice, 15, y);
    y += 8;
    if (sale.documentationFee && sale.documentationFee > 0) {
        doc.text('Documentation Fee: £' + sale.documentationFee, 15, y);
        y += 8;
    }
    if (sale.registrationFee && sale.registrationFee > 0) {
        doc.text('Registration Fee: £' + sale.registrationFee, 15, y);
        y += 8;
    }
    if (sale.extras && sale.extras.length > 0) {
        sale.extras.forEach((extra, i) => {
            doc.text(`${extra.name}: £${extra.price}`, 15, y);
            y += 8;
        });
    }
    if (sale.tradeInValue && sale.tradeInValue > 0) {
        doc.text('Trade-In: -£' + sale.tradeInValue, 15, y);
        y += 8;
    }
    if (sale.discountValue && sale.discountValue > 0) {
        doc.text('Discount: -£' + sale.discountValue, 15, y);
        y += 8;
    }
    // Total
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('Total:', 120, y);
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    const total = (sale.salePrice +
        (sale.documentationFee || 0) +
        (sale.registrationFee || 0) +
        (sale.extras ? sale.extras.reduce((sum, e) => sum + (e.price || 0), 0) : 0)
        - (sale.tradeInValue || 0)
        - (sale.discountValue || 0));
    doc.text('£' + total.toLocaleString(), 150, y);
    y += 14;
    // Payment & Finance Section
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('Payment & Finance', 15, y);
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    y += 8;
    doc.text('Payment Method: ' + sale.paymentMethod, 15, y);
    doc.text('Deposit: £' + sale.deposit, 120, y);
    y += 8;
    if (sale.useFinance) {
        doc.text('Finance: Yes', 15, y);
        doc.text('APR: ' + sale.apr + '%', 120, y);
        y += 8;
        doc.text('Term: ' + sale.termMonths + ' months', 15, y);
        y += 8;
    }
    // Notes Section
    y += 8;
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('Notes', 15, y);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    y += 7;
    doc.text(sale.notes, 15, y, { maxWidth: 180 });
    // Terms & Conditions Section
    y += 14;
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('Terms & Conditions', 15, y);
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    y += 7;
    const termsLines = doc.splitTextToSize(sale.terms, 180);
    termsLines.forEach((line) => {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(line, 15, y);
        y += 6;
    });
    // Signature Section
    if (y > 260) {
        doc.addPage();
        y = 40;
    }
    else {
        y += 20;
    }
    doc.setFontSize(12);
    doc.setTextColor(40, 60, 120);
    doc.text('Customer Signature: ___________________________', 15, y);
    doc.text('Date: _______________', 150, y);
    doc.save(`Invoice_${sale.invoiceNumber}.pdf`);
}
