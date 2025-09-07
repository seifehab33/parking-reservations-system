export function handlePrint(printRef: React.RefObject<HTMLDivElement | null>) {
  if (printRef.current) {
    const printContents = printRef.current.innerHTML;
    const win = window.open("", "", "width=600,height=400");

    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>Ticket</title>
            <style>
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
              }

              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: #f9f9f9;
                padding: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .ticket {
                background: #fff;
                border: 2px dashed #4b5563;
                border-radius: 12px;
                padding: 24px 32px;
                width: 350px;
                text-align: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              }

              .ticket h2 {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 16px;
                color: #111827;
              }

              .ticket-details {
                text-align: left;
                font-size: 14px;
                line-height: 1.6;
                color: #374151;
              }

              .detail-row {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px dashed #e5e7eb;
                padding: 6px 0;
              }

              .label {
                font-weight: 600;
                color: #6b7280;
              }

              .value {
                font-family: monospace;
                color: #111827;
              }

              .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #9ca3af;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="ticket">
              <h2>🎟 Entry Ticket</h2>
              <div class="ticket-details">
                ${printContents}
              </div>
              <div class="footer">Thank you for visiting!</div>
            </div>
          </body>
        </html>
      `);
      win.document.close();
      win.print();
    }
  }
}
