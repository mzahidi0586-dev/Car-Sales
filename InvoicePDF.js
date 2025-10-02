import { jsPDF } from "jspdf";
export function generateInvoicePDF(sale, vehicles) {
    var _a;
    const doc = new jsPDF();
    // Modern Header with Logo and accent background
    doc.setFillColor(230, 242, 255);
    doc.rect(0, 0, 210, 40, 'F');
    doc.addImage('https://img.icons8.com/ios-filled/100/000000/car--v2.png', 'PNG', 12, 8, 18, 18);
    doc.setFontSize(24);
    doc.setTextColor(40, 60, 120);
    doc.text('HNS Cars Ltd', 35, 18);
    doc.setFontSize(13);
    doc.setTextColor(80, 80, 80);
    doc.text('Roe Hyde Farm, Hatfield AL4 0PJ', 35, 26);
    doc.text('Phone: 01923 557253', 35, 32);
    doc.setFontSize(20);
    doc.setTextColor(40, 60, 120);
    doc.text('SALES INVOICE', 150, 18);
    doc.setFontSize(13);
    doc.setTextColor(80, 80, 80);
    doc.text(`Invoice #: ${sale.invoiceNumber}`, 150, 26);
    doc.text(`Date: ${new Date(sale.date).toLocaleDateString('en-GB')}`, 150, 32);
    // Section divider
    doc.setDrawColor(40, 60, 120);
    doc.setLineWidth(1.2);
    doc.line(12, 40, 198, 40);
    // Bill To & Details Card backgrounds (match modal)
    doc.setFillColor(230, 242, 255);
    doc.roundedRect(12, 44, 90, 48, 8, 8, 'F');
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(108, 44, 90, 48, 8, 8, 'F');
    // Bill To
    doc.setFontSize(14);
    doc.setTextColor(40, 60, 120);
    doc.text('Bill To', 18, 54);
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text(sale.customer, 18, 60);
    const addressLines = doc.splitTextToSize(sale.customerAddress, 80);
    let addressY = 66;
    addressLines.forEach((line) => {
        doc.text(line, 18, addressY);
        addressY += 5.5;
    });
    doc.text(`Email: ${sale.customerEmail}`, 18, addressY);
    addressY += 5.5;
    doc.text(`Phone: ${sale.customerPhone}`, 18, addressY);
    // Details
    doc.setFontSize(14);
    doc.setTextColor(40, 60, 120);
    doc.text('Details', 112, 54);
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text(`Sales Person: ${sale.salesPerson}`, 112, 60);
    doc.text(`Payment Method: ${sale.paymentMethod}`, 112, 66);
    doc.text(`Deposit: £${sale.deposit}`, 112, 72);
    // Section divider
    doc.setDrawColor(200, 220, 255);
    doc.setLineWidth(0.8);
    doc.line(12, 84, 198, 84);
    // Item Table (match modal: table look, alternating backgrounds)
    let y = 98;
    doc.setFillColor(230, 242, 255);
    doc.roundedRect(12, y - 6, 186, 14, 8, 8, 'F');
    doc.setFontSize(14);
    doc.setTextColor(40, 60, 120);
    doc.text('Item Description', 18, y);
    doc.text('Amount', 180, y);
    y += 10;
    doc.setDrawColor(230, 242, 255);
    doc.setLineWidth(0.5);
    doc.line(18, y, 194, y);
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    // Vehicle row
    doc.setFillColor(255, 255, 255);
    doc.rect(12, y - 4, 186, 10, 'F');
    doc.text(sale.vehicle, 18, y);
    doc.text('VIN: ' + (((_a = vehicles.find(v => v.id === sale.vehicleId)) === null || _a === void 0 ? void 0 : _a.vin) || ''), 80, y);
    doc.text('£' + sale.salePrice.toLocaleString(), 180, y);
    y += 10;
    // Fees
    if (sale.documentationFee && sale.documentationFee > 0) {
        doc.setFillColor(245, 247, 250);
        doc.rect(12, y - 4, 186, 10, 'F');
        doc.text('Documentation Fee', 18, y);
        doc.text('£' + sale.documentationFee, 180, y);
        y += 10;
    }
    if (sale.registrationFee && sale.registrationFee > 0) {
        doc.setFillColor(255, 255, 255);
        doc.rect(12, y - 4, 186, 10, 'F');
        doc.text('Registration Fee', 18, y);
        doc.text('£' + sale.registrationFee, 180, y);
        y += 10;
    }
    // Extras
    if (sale.extras && sale.extras.length > 0) {
        sale.extras.forEach((extra, i) => {
            doc.setFillColor(i % 2 === 0 ? 245 : 255, 247, 250);
            doc.rect(12, y - 4, 186, 10, 'F');
            doc.text(extra.name, 18, y);
            doc.text('£' + extra.price, 180, y);
            y += 10;
        });
    }
    // Trade-In & Discount
    if (sale.tradeInValue && sale.tradeInValue > 0) {
        doc.setFillColor(255, 255, 255);
        doc.rect(12, y - 4, 186, 10, 'F');
        doc.setTextColor(200, 0, 0);
        doc.text('Trade-In', 18, y);
        doc.text('-£' + sale.tradeInValue, 180, y);
        doc.setTextColor(30, 30, 30);
        y += 10;
    }
    if (sale.discountValue && sale.discountValue > 0) {
        doc.setFillColor(245, 247, 250);
        doc.rect(12, y - 4, 186, 10, 'F');
        doc.setTextColor(200, 0, 0);
        doc.text('Discount', 18, y);
        doc.text('-£' + sale.discountValue, 180, y);
        doc.setTextColor(30, 30, 30);
        y += 10;
    }
    // Totals card (match modal)
    doc.setFillColor(230, 242, 255);
    doc.roundedRect(120, y, 78, 18, 8, 8, 'F');
    doc.setFontSize(14);
    doc.setTextColor(40, 60, 120);
    doc.text('Total', 123, y + 9);
    doc.setFontSize(15);
    doc.setTextColor(40, 60, 120);
    const total = (sale.salePrice +
        (sale.documentationFee || 0) +
        (sale.registrationFee || 0) +
        (sale.extras ? sale.extras.reduce((sum, e) => sum + (e.price || 0), 0) : 0)
        - (sale.tradeInValue || 0)
        - (sale.discountValue || 0));
    doc.text('£' + total.toLocaleString(), 180, y + 9, { align: 'right' });
    y += 26;
    // Section divider
    doc.setDrawColor(200, 220, 255);
    doc.setLineWidth(0.8);
    doc.line(12, y, 198, y);
    y += 10;
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
    doc.setFillColor(245, 247, 250);
    doc.rect(15, y - 5, 180, 12, 'F');
    doc.text(sale.notes || 'All vehicles HPI-clear. Subject to terms & conditions.', 18, y + 4, { maxWidth: 174 });
    y += 16;
    // Terms & Conditions Section
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('Terms & Conditions', 15, y);
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    y += 7;
    const termsLines = doc.splitTextToSize(sale.terms, 174);
    let termsY = y + 2;
    let boxStartY = termsY - 2;
    let boxHeight = termsLines.length * 6 + 8;
    // If box would overflow page, split across pages
    if (boxStartY + boxHeight > 270) {
        boxHeight = 270 - boxStartY;
    }
    doc.setFillColor(245, 247, 250);
    doc.rect(15, boxStartY, 180, boxHeight, 'F');
    termsLines.forEach((line) => {
        if (termsY > 270) {
            doc.addPage();
            termsY = 20;
            boxStartY = termsY - 2;
            // recalculate boxHeight for remaining lines
            let remaining = termsLines.length - Math.floor((termsY - y - 2) / 6);
            boxHeight = remaining * 6 + 8;
            if (boxStartY + boxHeight > 270)
                boxHeight = 270 - boxStartY;
            doc.setFillColor(245, 247, 250);
            doc.rect(15, boxStartY, 180, boxHeight, 'F');
        }
        doc.text(line, 18, termsY);
        termsY += 6;
    });
    y = termsY + 10;
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
    // Thank you footer
    doc.setFontSize(13);
    doc.setTextColor(40, 60, 120);
    doc.text('Thank you for your business!', 15, y + 16);
    doc.save(`Invoice_${sale.invoiceNumber}.pdf`);
}
