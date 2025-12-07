export function chromeTheme(coins) {
  const date = new Date().toLocaleDateString("da-DK");

  let items = "";
  coins.forEach((c) => {
    items += `
      <div style="
        border:2px solid #888;
        border-radius:10px;
        padding:14px;
        margin-bottom:20px;
        background:#111;
        color:#eee;
        font-family:Arial;
        box-shadow:0 0 10px #222 inset;
      ">
        <img src="${c.image}" 
         style="width:130px;height:130px;object-fit:contain;border-radius:6px;border:2px solid #666;"/>
        <h3 style="color:#d4af37;margin:10px 0 4px;">${c.country}</h3>
        <p style="margin:0;">År: ${c.year}</p>
        <p style="margin:0;">Type: ${c.type}</p>
        <p style="margin:0;">Variant: ${c.variant}</p>
        <p style="margin:0;">Metal: ${c.metal}</p>
        <p style="margin:0;">Stand: ${c.grade}</p>
      </div>
    `;
  });

  return `
    <html>
      <body style="background:#000;font-family:Arial;padding:20px;">

        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="font-size:38px;color:#d4af37;">SagaMøntClean</h1>
          <h2 style="color:#888;margin-top:-6px;">Black Chrome Edition</h2>
          <p style="color:#ccc;">Genereret: ${date}</p>
        </div>

        ${items}

      </body>
    </html>
  `;
}
