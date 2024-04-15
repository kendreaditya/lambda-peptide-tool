// index.js
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const chromium = require("@sparticuz/chromium");

const getBrowser = async () => {
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Update this path
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
        // args: ['--disable-features=site-per-process', '--no-sandbox'],
    });

    return browser;
}

const antimicrobial = async (event) => {
    console.log(event);
    const sequence = `>1\n${event['sequence']}`;

    const browser = await getBrowser();

    const page = await browser.newPage();
    console.log('Navigating to the website');

    await page.goto('https://www.dveltri.com/ascan/v2/ascan.html');
    
    // Find the textbox and input the peptide sequence
    await page.type('#seqInput', sequence);
    console.log('Submitting the sequence');
    
    await page.click('button.btn.btn-default[type="submit"]', {timeout: 500000});
    console.log('Waiting for the result to appear');

    // Wait for the result to appear (you may need to adjust the selector)
    await page.waitForSelector('#CSVTable > table > tbody > tr > td:nth-child(3)', {timeout: 500000});
    console.log('Extracting the desired part of the page HTML');

    // Extract the desired part of the page HTML
    const value = await page.$eval('#CSVTable > table > tbody > tr > td:nth-child(3)', element => element.innerHTML);
    console.log('Closing the browser');

    await browser.close();
    
    console.log(value);
    return value;
}

const antiinflammatory = async (event) => {
    console.log(event);
    const sequence = `>1\n${event['sequence']}`;

    const browser = await getBrowser();

    const page = await browser.newPage();
    console.log('Navigating to the website');

    await page.goto('http://kurata14.bio.kyutech.ac.jp/PreAIP/');
    
    // Find the textbox and input the peptide sequence
    await page.type('#text', sequence);
    console.log('Submitting the sequence');
    
    await page.click('#content > div > div > div.row-1.outdent > div > div > div > form > div > input:nth-child(7)', {timeout: 500000});
    console.log('Waiting for the result to appear');

    // Wait for the result to appear (you may need to adjust the selector)
    await page.waitForSelector('#main > div > table.auto > tbody > tr:nth-child(2) > td:nth-child(2)', {timeout: 500000});
    console.log('Extracting the desired part of the page HTML');

    // Extract the desired part of the page HTML
    const value = await page.$eval('#main > div > table.auto > tbody > tr:nth-child(2) > td:nth-child(2)', element => element.innerHTML);
    const numberRegex = /\d+\.\d+/;
    const extractedNumber = parseFloat(value.match(numberRegex)[0]);

    console.log('Closing the browser');

    await browser.close();
    
    console.log(extractedNumber);
    return extractedNumber;
}


const metalbinding = async (event) => {
    console.log(event);
    const sequence = `>1\n${event['sequence']}`;

    const browser = await getBrowser();

    const page = await browser.newPage();
    console.log('Navigating to the website');

    await page.goto('https://services.bromberglab.org/mebipred/home');
    
    // Find the textbox and input the peptide sequence
    await page.type('#layout-content > form > div > div.custom-file > textarea', sequence);
    console.log('Submitting the sequence');
    
    await page.click('#layout-content > form > div > div.custom-file > button', {timeout: 500000});
    console.log('Waiting for the result to appear');

    await page.waitForSelector('#layout-content > table > tbody > tr:nth-child(2) > td:nth-child(5) > a.run-link', {timeout: 500000});
    await page.click('#layout-content > table > tbody > tr:nth-child(2) > td:nth-child(5) > a.run-link');

    await page.waitForSelector('#layout-content > table > tbody > tr:nth-child(2) > td:nth-child(1)', {timeout: 500000});
    const job_number = await page.$eval('#layout-content > table > tbody > tr:nth-child(2) > td:nth-child(1)', element => element.innerHTML);
    const numbers = job_number.match(/\d+/g);
    const id = await parseInt(numbers[0]);
    console.log('Job number is', id);

    // Wait for the result to appear (you may need to adjust the selector)
    await page.waitForSelector(`#link${id} > a`, {timeout: 500000});
    console.log('Extracting the desired part of the page HTML');
    const url = await `https://services.bromberglab.org/mebipred/download/${id}`;
    console.log(url);

    // Sleep for 1 second
    await new Promise(r => setTimeout(r, 1000));

    const data = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    }).then(r => r.text())

    const lines = data.trim().split('\n');

    const headers = lines[lines.length-2].trim().split(/\s+/);
    const values = lines[lines.length-1].trim().split(/\s+/);

    // Constructing an object to hold metal bindings for each element
    const metalBindings = {};
    for (let i = 2; i < headers.length; i++) {
        metalBindings[headers[i]] = parseFloat(values[i]);
    }

    // Converting the object to JSON
    // const metalBindingsJSON = JSON.stringify(metalBindings, null, 2);
    // console.log(metalBindingsJSON);
    console.log(metalBindings);

    await browser.close();
    return metalBindings;
}

const secondary_structure = async (event) => {
    console.log(event);
    const sequence = `>1\n${event['sequence']}`;

    const browser = await getBrowser();

    const page = await browser.newPage();
    console.log('Navigating to the website');

    await page.goto('https://webs.iiitd.edu.in/raghava/pep2d/submit.html');
    
    // Find the textbox and input the peptide sequence
    await page.type('#content > form > table > tbody > tr:nth-child(3) > td > textarea', sequence);
    console.log('Submitting the sequence');
    
    await page.click('#content > form > table > tbody > tr:nth-child(6) > td > input[type=submit]:nth-child(2)', {timeout: 500000});
    console.log('Waiting for the result to appear');

    await page.waitForSelector('#body > table', {timeout: 500000});
    const seq_data = await page.$eval('#body > table > tbody > tr:nth-child(3) > td > font > pre > font', element => element.innerHTML);
    console.log('Job number is', seq_data);
    return seq_data;
}

// const get_sequence_properties = async (event) => {
//     const antimicrobial_value = await antimicrobial(event);
//     const antiinflammatory_value = await antiinflammatory(event);
//     const metalbinding_value = await metalbinding(event);
//     // const secondary_structure_value = await secondary_structure(sequence);

//     return {
//         antimicrobial: antimicrobial_value,
//         antiinflammatory: antiinflammatory_value,
//         metalbinding: metalbinding_value,
//         // secondary_structure: secondary_structure_value
//     }
// }

const get_sequence_properties = async (event) => {
  const [antimicrobial_value, antiinflammatory_value, metalbinding_value] = await Promise.all([
    antimicrobial(event),
    antiinflammatory(event),
    metalbinding(event),
    // secondary_structure(sequence)
  ]);

  return {
    antimicrobial: antimicrobial_value,
    antiinflammatory: antiinflammatory_value,
    metalbinding: metalbinding_value,
    // secondary_structure: secondary_structure_value
  };
};


// get_sequence_properties({sequence: 'AKTCVADESAENCDK'}).then(c=>console.log(c));

exports.handler = async (event, context) => {
    const sequence = JSON.parse(event['body'])['sequence']

    if (!sequence) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing required parameter "sequence"', event: event, context: context }),
        };
    }
    try {
        const sequence_properties = await get_sequence_properties({sequence: sequence});

        return {
            statusCode: 200,
            body: JSON.stringify(sequence_properties)
        };
    } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while processing the request' }),
    };
  }
};