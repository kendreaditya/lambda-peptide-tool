# Sequence Properties Web Application

This project is a web application that allows users to input a peptide sequence and retrieve various properties of the sequence, including its antimicrobial potential, anti-inflammatory potential, and metal-binding potential.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Web Scraping](#web-scraping)

## Features

- User-friendly web interface for entering peptide sequences
- Calculation of antimicrobial potential using the DVeltri ASCAN tool
- Prediction of anti-inflammatory potential using the PreAIP tool
- Estimation of metal-binding potential using the MeBIPred tool
- Real-time display of sequence properties on the web page
- Loading animation while processing the sequence

## Technologies

- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js, AWS Lambda, Puppeteer
- Infrastructure: AWS CDK (Cloud Development Kit)
- Containerization: Docker

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kendreaditya/lambda-peptide-tool.git
```

2. Install the required dependencies:

```bash
cd sequence-properties
npm install
```

3. Build the project:

```bash
npm run build
```

4. Deploy the application to AWS using the CDK:

```bash
cdk deploy
```

## Usage

1. Open the web application in your browser using the provided URL.
2. Enter a peptide sequence in the input field.
3. Click the "Get Sequence Properties" button.
4. Wait for the processing to complete (this may take around a minute).
5. The sequence properties will be displayed on the page.

## Project Structure

```
sequence-properties/
├── lib/
│   └── docker-lambda-aws-stack.ts    # AWS CDK stack definition
├── src/
│   ├── app.js                        # Back-end Lambda function code
│   └── index.html                    # Front-end HTML, CSS, and JavaScript
├── Dockerfile                        # Docker configuration for Lambda function
├── docker-lambda-aws.ts              # AWS CDK app entry point
├── package.json                      # Project dependencies
└── README.md                         # This file
```

The `src/app.js` file contains the back-end logic for fetching sequence properties from various bioinformatics tools using Puppeteer. The `src/index.html` file contains the front-end HTML, CSS, and JavaScript code for the web interface.

The AWS CDK is used to define the infrastructure resources (e.g., Lambda function, API Gateway) and deploy the application to AWS. The Docker container is used to package the Node.js Lambda function with its dependencies.

## Web Scraping

The back-end Lambda function uses the Puppeteer library to automate web browsing and scrape data from the following websites:

1. **DVeltri ASCAN**: https://www.dveltri.com/ascan/v2/ascan.html
   - This website is used to calculate the antimicrobial potential of the input peptide sequence.

2. **PreAIP**: http://kurata14.bio.kyutech.ac.jp/PreAIP/
   - This website is used to predict the anti-inflammatory potential of the input peptide sequence.

3. **MeBIPred**: https://services.bromberglab.org/mebipred/home
   - This website is used to estimate the metal-binding potential of the input peptide sequence for various metals.

The `app.js` file contains separate functions for scraping each of these websites. The functions automate the process of navigating to the website, entering the peptide sequence, submitting the form, and extracting the desired results from the page.
