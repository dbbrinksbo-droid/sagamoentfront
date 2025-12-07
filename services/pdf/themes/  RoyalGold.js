eexport function royalGoldTheme(coins) {
  const date = new Date().toLocaleDateString("da-DK");

  let items = "";
  coins.forEach((c) => {
    items += `
      <div style="
        border:2px solid #D4AF37;
        border-radius:10px;
        padding:14px;
        margin-bottom:26px;
        background:#1a1a1a;
        color:#f7e7a1;
        font-family:'Georgia';
        box-shadow:0 0 12px rgba(212,175,55,0.3);
      ">
        <img src="${c.image}" 
          style="width:150px;height:150px;object-fit:contain;
                 border-radius:8px;border:2px solid #D4AF37;"/>
        <h3 style="margin:12px 0 6px;color:#fcefb4;">${c.country}</h3>
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
        background:#0e0e0e;
        background-image:url('https://i.imgur.com/WG5Ra2l.jpeg');
        background-size:cover;
        font-family:'Georgia';
        padding:22px;
      ">

        <div style="text-align:center;margin-bottom:40px;">
          <h1 style="font-size:44px;color:#f3d98c;
                     text-shadow:0 0 8px rgba(212,175,55,0.5);">
            Sagamoent™
          </h1>

          <h2 style="
            margin-top:-8px;
            color:#fcefb4;
            letter-spacing:1.5px;
            font-size:22px;
            text-transform:uppercase;
          ">
            Royal Gold Edition
          </h2>

          <p style="color:#d4af37;font-size:16px;">
            Genereret: ${date}
          </p>
        </div>

        ${items}

      </body>
    </html>
  `;
}
