const express = require('express');
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express();

// Habilitar CORS

app.use(cors());
app.use(bodyParser.json());

app.post('/formulario', async (req, res) => {

    const data = req.body;
    console.log(data)

    let html = `
      <html>
        <head>
          <style>
          @page {  }
          table { border-collapse:collapse; border-spacing:0; empty-cells:show }
          td, th { vertical-align:top; font-size:10pt;}
          h1, h2, h3, h4, h5, h6 { clear:both;}
          p { white-space: nowrap; }
          ol, ul { margin:0; padding:0;}
          li { list-style: none; margin:0; padding:0;}
          /* "li span.odfLiEnd" - IE 7 issue*/
          li span. { clear: both; line-height:0; width:0; height:0; margin:0; padding:0; }
          span.footnodeNumber { padding-right:1em; }
          span.annotation_style_by_filter { font-size:95%; font-family:Arial; background-color:#fff000;  margin:0; border:0; padding:0;  }
          span.heading_numbering { margin-right: 0.8rem; }* { margin:0;}
          .gr1 { font-size:12pt; writing-mode:horizontal-tb; direction:ltr;padding-top:0.125cm; padding-bottom:0.125cm; padding-left:0.25cm; padding-right:0.25cm; }
          .P1 { text-align:left ! important; font-size:18pt; }
          .ta1 { writing-mode:horizontal-tb; direction:ltr; }
          .Default { font-family:Calibri; vertical-align:bottom; color:#000000; font-size:11pt; }
          .ce1 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce10 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; border-bottom-style:none; border-left-style:none; border-right-style:none; border-top-width:NaNcm; border-top-style:solid; border-top-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce11 { color:#000000; font-size:10pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce12 { color:#000000; font-size:12pt; font-family:Calibri; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce13 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce14 { color:#000000; font-size:10pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce15 { color:#000000; font-size:10pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce16 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:top; background-color:#ffffff; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce17 { color:#000000; font-size:11pt; font-family:Calibri; vertical-align:bottom; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce18 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; border-bottom-style:none; background-color:#ffffff; border-left-style:none; border-right-width:NaNcm; border-right-style:solid; border-right-color:#000000; border-top-style:none; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce19 { color:#000000; font-size:11pt; font-family:Calibri; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce2 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce20 { color:#000000; font-size:9pt; font-family:Arial; vertical-align:middle; background-color:#ffffff; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce21 { color:#000000; font-size:10pt; font-family:Arial; vertical-align:middle; background-color:#ffffff; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce22 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce23 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce24 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:left ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce25 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; border-style:none; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce26 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:middle; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce27 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce3 { color:#000000; font-size:10pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:left ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce4 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce5 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce6 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce7 { color:#000000; font-size:11pt; font-family:Arial; vertical-align:bottom; font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .ce8 { color:#000000; font-size:11pt; font-family:Calibri; vertical-align:bottom; }
          .ce9 { color:#000000; font-size:10pt; font-family:Arial; vertical-align:middle; border-width:NaNcm; border-style:solid; border-color:#000000; text-align:center ! important; margin-left:0cm; writing-mode:horizontal-tb; direction:ltr;font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          .co1 { width:2.683cm; }
          .co2 { width:4.059cm; }
          .co3 { width:0.914cm; }
          .co4 { width:9.491cm; }
          .co5 { width:2.575cm; }
          .co6 { width:2.822cm; }
          .co7 { width:4.694cm; }
          .co8 { width:4.621cm; }
          .co9 { width:3.568cm; }
          .ro1 { height:1.005cm; }
          .ro10 { height:0.921cm; }
          .ro11 { height:0.894cm; }
          .ro12 { height:0.815cm; }
          .ro13 { height:0.841cm; }
          .ro14 { height:1.027cm; }
          .ro15 { height:1.21cm; }
          .ro16 { height:0.868cm; }
          .ro17 { height:0.736cm; }
          .ro18 { height:0.397cm; }
          .ro19 { height:0.714cm; }
          .ro2 { height:0.503cm; }
          .ro20 { height:1.111cm; }
          .ro21 { height:0.529cm; }
          .ro3 { height:0.9cm; }
          .ro4 { height:0.926cm; }
          .ro5 { height:0.979cm; }
          .ro6 { height:1.032cm; }
          .ro7 { height:0.529cm; }
          .ro8 { height:2.249cm; }
          .ro9 { height:0.762cm; }
          .T1 { color:#000000; font-family:Calibri; font-size:11pt; font-style:normal; text-shadow:none; text-decoration:none ! important; font-weight:normal; }
          /* ODF styles with no properties representable as CSS */
           { }
          </style>
        </head>
        <body>
        <table border="0" cellspacing="0" cellpadding="0" class="ta1">
        <colgroup>
            <col width="117"/><col width="177"/><col width="40"/><col width="415"/><col width="113"/><col width="123"/><col width="123"/><col width="205"/><col width="202"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="117"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/><col width="156"/>
            </colgroup>
        <tr class="ro1"><td colspan="3" rowspan="3" style="text-align:left;width:2.683cm; " class="ce1">
            <div style="height:2.671cm;width:5.423cm; padding:0; " id="image1_png" class="P1">
                <p><img style="height:2.671cm;width:5.423cm;" alt="" src=""/></p>
            </div>
            </td><td colspan="4" rowspan="3" style="text-align:left;width:9.491cm; " class="ce13">
                <p>HOJA DE CONTROL DOCUMENTAL</p>
            </td>
            <td colspan="2" style="text-align:left;width:4.694cm; " class="ce24">
                <p>CÓDIGO: </p>
            </td>
        </tr>
        <tr class="ro1">
            <td colspan="2" style="text-align:left;width:4.694cm; " class="ce24">
                <p>FECHA DE ACTUALIZACIÓN: </p>
            </td>
        </tr>
        <tr class="ro1">
            <td colspan="2" style="text-align:left;width:4.694cm; " class="ce24">
                <p>VERSIÓN: 1</p>
            </td>
        </tr>
        <tr class="ro2">
            <td colspan="9" style="text-align:left;width:2.683cm; " class="ce2">
                <p>A. DATOS GENERALES</p>
            </td>
        </tr>
        <tr class="ro3">
            <td colspan="4" style="text-align:left;width:2.683cm; " class="ce3">
                <p>Nombre oficina productora:</p>
            </td>
            <td colspan="5" style="text-align:left;width:2.575cm; " class="ce15">
                <p>CATASTRO</p>
            </td>
        </tr>
        <tr class="ro4">
            <td colspan="4" style="text-align:left;width:2.683cm; " class="ce3">
                <p>Código serie / Nombre serie:</p>
            </td>
            <td colspan="5" style="text-align:left;width:2.575cm; " class="ce15"> </td>
        </tr>
        <tr class="ro4">
                <td colspan="4" style="text-align:left;width:2.683cm; " class="ce3">
                <p>Código subserie / Nombre subserie:</p>
            </td>
            <td colspan="5" style="text-align:left;width:2.575cm; " class="ce15"> </td>
        </tr>
        <tr class="ro5">
            <td colspan="4" style="text-align:left;width:2.683cm; " class="ce3">
                <p>Nombre del asunto :</p>
            </td>
            <td colspan="5" style="text-align:left;width:2.575cm; " class="ce16"> </td>
        </tr>
        <tr class="ro6">
            <td colspan="4" style="text-align:left;width:2.683cm; " class="ce3">
                <p>Fecha de apertura hoja de control: </p>
            </td>
            <td colspan="2" style="text-align:left;width:2.575cm; " class="ce4"> </td>
            <td colspan="2" style="text-align:left;width:2.822cm; " class="ce15">
                <p>Hoja de control No.</p>
            </td>
            <td style="text-align:left;width:4.621cm; " class="ce9">
                <p>1</p>
            </td>
        </tr>
        <tr class="ro7">
            <td colspan="9" style="text-align:left;width:2.683cm; " class="ce1">
                <p>B. RELACIÓN DE DOCUMENTOS A ARCHIVAR </p>
            </td>
        </tr>
        <tr class="ro8">
            <td style="text-align:left;width:2.683cm; " class="ce4">
                <p>Ítem</p>
            </td>
            <td style="text-align:left;width:4.059cm; " class="ce9">
                <p>Fecha de ingreso (dd/mmm/aaaa)</p>
            </td>
            <td colspan="2" style="text-align:left;width:0.914cm; " class="ce9">
                <p> Tipo documental</p>
            </td>
            <td style="text-align:left;width:2.575cm; " class="ce9">
                <p>No. de folio que inicia</p>
            </td>
            <td style="text-align:left;width:2.822cm; " class="ce9">
                <p>No. de folio que finaliza</p>
            </td>
            <td colspan="3" style="text-align:left;width:2.822cm; " class="ce9">
                <p>Observaciones</p>
            </td>
        </tr> 
    `;
    for (let i = 0; i < data.length; i++) {
      // Se itera sobre cada objeto del array y se concatena su contenido en el HTML
      html += `
      
        <tr class="ro9">
            <td style="text-align:left;width:2.683cm; " class="ce4">
                <p>1</p>
            </td>
            <td style="text-align:left;width:4.059cm; " class="ce4">${data[i].fecha} </td>
            <td colspan="2" style="text-align:left;width:0.914cm; " class="ce11">${data[i].tipo} </td>
            <td style="text-align:left;width:2.575cm; " class="ce4">${data[i].firstFlo} </td>
            <td style="text-align:left;width:2.822cm; " class="ce4"> ${data[i].finishFlo} </td>
            <td colspan="3" style="text-align:left;width:2.822cm; " class="ce18">${data[i].observaciones} </td>        
        </tr>
        
      `;

      html += `
      <tr class="ro1">
        <td colspan="2" style="text-align:left;width:2.683cm; " class="ce6">
            <p>Nombre completo de quien diligencia:</p>
        </td>
        <td colspan="7" style="text-align:left;width:0.914cm; " class="ce13"> </td>
      </tr>
      <tr class="ro19">
        <td colspan="2" style="text-align:left;width:2.683cm; " class="ce6">
            <p>Cargo :</p>
        </td>
        <td colspan="7" style="text-align:left;width:0.914cm; " class="ce13">
            <p>AUXILIAR GESTIÓN DOCUMENTAL</p>
        </td>
      </tr>
      <tr class="ro20">
        <td colspan="2" style="text-align:left;width:2.683cm; " class="ce6">
          <p>Firma :</p>
        </td>
        <td colspan="7" style="text-align:left;width:0.914cm; " class="ce14"> </td>
      </tr>
    </table>
    </body>
    </html>
      `
    }
  

  
    // Renderizar la plantilla HTML en un navegador virtual
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
  
    // Generar el PDF y enviarlo como respuesta
    const pdf = await page.pdf({ format: 'A4' });
    res.type('application/pdf');
    res.send(pdf);
  
    // Cerrar el navegador virtual
    await browser.close();
});

app.listen(port, () => console.log(`server listening on port:  ${port}`));
