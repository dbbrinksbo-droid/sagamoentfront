export function antiqueTheme(coins) {
  const date = new Date().toLocaleDateString("da-DK");

  let items = "";
  coins.forEach((c) => {
    items += `
      <div style="
        border:2px solid #bfa46f;
        border-radius:8px;
        padding:12px;
        margin-bottom:22px;
        background:#f2e7c9;
        color:#3a2b14;
        font-family:'Times New Roman';
      ">
        <img src="${c.image}" 
          style="width:140px;height:140px;object-fit:contain;border-radius:6px;border:2px solid #bfa46f;"/>
        <h3 style="margin:10px 0 4px;">${c.country}</h3>
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
      <body style="
        background:#f5ecd5;
        background-image:url('https://i.imgur.com/0kZP4zE.png'); 
        background-size:cover;
        font-family:'Times New Roman';
        padding:20px;
      ">

        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="font-size:40px;color:#3a2b14;">SagaMøntClean</h1>
          <h2 style="margin-top:-10px;color:#6e5633;">Antique Manuscript Edition</h2>
          <p style="color:#3a2b14;">Genereret: ${date}</p>
        </div>

        ${items}

      </body>
    </html>
  `;
}
