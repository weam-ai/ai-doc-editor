export const businessProposalTemplate3 = {
    _id: 'business-proposal-3',
    name: 'Ten Principles for Good Design',
    description: 'Create and edit HTML documents with inline styles',
    category: 'creative-marketing',
    prompt: 'Create an HTML document with inline styles',
    preview: '📋',
    editor: 'html',
  
    contentHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dieter Rams: Ten Principles for Good Design</title>
</head>
<body style="max-width:880px;margin:0 auto;padding:32px 40px;font-family:'Times New Roman',serif;line-height:1.6;color:#000;background:#fff;">

  <header>
    <hr style="border:none;border-top:1px solid #ccc;margin:30px 0 40px 0;"/>
    <h1 style="font-size:2.8rem;font-weight:bold;margin-bottom:0.5rem;line-height:1.2;text-align:left;color:#000;">
      Dieter Rams:<br>ten principles<br>for good design
    </h1>
  </header>

  <main style="display:block;width:100%;margin-top:40px;">

    <!-- Principles 1-4 -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:30px;margin-bottom:30px;">
      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">1</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design is innovative</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          The possibilities for innovation are not, by any means, exhausted.
        </div>
      </div>

      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">2</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design makes a product useful</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          A product is bought to be used. It has to satisfy certain criteria, not only functional, but also psychological and aesthetic.
        </div>
      </div>

      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">3</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design is aesthetic</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          The aesthetic quality of a product is integral to its usefulness because products we use every day affect our person and our well-being.
        </div>
      </div>

      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">4</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design makes a product understandable</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          It clarifies the product's structure. Better still, it can make the product talk. At best, it is self-explanatory.
        </div>
      </div>
    </div>

    <!-- Principles 5-8 -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:30px;margin-bottom:30px;">
      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">5</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design is unobtrusive</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          Products fulfilling a purpose are like tools. They are neither decorative objects nor works of art.
        </div>
      </div>

      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">6</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design is honest</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          It does not make a product more innovative, powerful or valuable than it really is.
        </div>
      </div>

      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">7</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design is long-lasting</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          It avoids being fashionable and therefore never appears antiquated.
        </div>
      </div>

      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">8</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design is thorough down to the last detail</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          Nothing must be arbitrary or left to chance.
        </div>
      </div>
    </div>

    <!-- Principles 9-10 + Image -->
    <div style="display:grid;grid-template-columns:25% 25% 50%;gap:30px;align-items:start;">
      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">9</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design is environmental-friendly</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          Design makes an important contribution to the preservation of the environment.
        </div>
      </div>

      <div style="margin-bottom:0;padding:15px;border-bottom:1px solid #ddd;">
        <div style="font-size:1.4rem;font-weight:bold;margin-bottom:6px;color:#000;">10</div>
        <div style="font-size:1rem;font-weight:bold;margin-bottom:8px;color:#000;">Good design is as little design as possible</div>
        <div style="font-size:0.85rem;line-height:1.4;color:#000;text-align:justify;">
          Less, but better – because it concentrates on the essential aspects, and the products are not burdened with non-essentials.
        </div>
      </div>

      <div style="width:100%;height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:15px;padding:15px;">
        <div style="font-size:1rem;font-weight:bold;text-align:center;color:#000;">
          Back to purity,<br>back to simplicity.
        </div>
        <img src="https://page1.genspark.site/v1/base64_upload/014ec620dc0b7fc47323b6cef3888204"
             alt="Dieter Rams Portrait"
             style="width:180px;height:200px;object-fit:cover;object-position:center;border-radius:4px;border:none;"/>
      </div>
    </div>
  </main>

</body>
</html>

  `
  };
  