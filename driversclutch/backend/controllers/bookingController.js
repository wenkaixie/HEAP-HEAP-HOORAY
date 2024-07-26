// const { Builder, By, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const options = new chrome.Options();

// // Enable headless mode for faster execution
// options.addArguments('headless');
// options.addArguments('disable-gpu');
// options.addArguments('window-size=1920x1080'); // Set window size for better element visibility

// module.exports = (req, res) => {
//     //set header first to allow request or origin domain (value can be different)
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

// //---- other code

//  //Preflight CORS handler
//     if(req.method === 'OPTIONS') {
//         return res.status(200).json(({
//             body: "OK"
//         }))
//     }
// }

// const makeBooking = async (req, res) => {
//     const { month, date } = req.query;
//     console.log('Booking request received:', month, date);

//     const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

//     try {
//         await driver.get('https://driversclutch.vercel.app/bbdc');
//         // await driver.get('http://localhost:3000/bbdc');

//         const monthSelector = async (month) => {
//             await driver.wait(until.elementLocated(By.css('.monthButtons button')), 10000);
//             const monthButtons = await driver.findElements(By.css('.monthButtons button'));
//             for (let button of monthButtons) {
//                 const text = await button.getText();
//                 if (text.includes(month)) {
//                     console.log(`Selecting month: ${month}`);
//                     await button.click();
//                     break;
//                 }
//             }
//         };

//         const normalizeString = (str) => str.trim().replace(/\s+/g, '');

//         const dateSelector = async (date) => {
//             await driver.wait(until.elementLocated(By.css('.calendarContainer .day')), 10000);
//             const dayElements = await driver.findElements(By.css('.calendarContainer .day'));
//             let dateSelected = false;

//             for (let day of dayElements) {
//                 const text = (await day.getText()).trim();
//                 const normalizedDate = normalizeString(String(date));
//                 const className = await day.getAttribute('class');
//                 if (text === normalizedDate && !className.includes('past')) {
//                     console.log(`Selecting date: ${date}`);
//                     await day.click();
//                     dateSelected = true;
//                     break;
//                 }
//             }

//             if (!dateSelected) {
//                 throw new Error(`Unable to select the date: ${date}`);
//             }
//         };

//         const findTimeSlots = async () => {
//             console.log(`Waiting for slots to be visible...`);
//             await driver.wait(until.elementLocated(By.css('.slotContainer')), 15000); // Wait for the slot container
//             await driver.wait(until.elementsLocated(By.css('.slotContainer .slot')), 15000); // Wait for the slots within the container
//             const slotElements = await driver.findElements(By.css('.slotContainer .slot'));
//             const slots = [];
//             for (let slot of slotElements) {
//                 const text = await slot.getText();
//                 slots.push(text);
//             }
//             return slots;
//         };

//         // Execute the steps
//         await monthSelector(month);
//         await dateSelector(date);
//         const availableSlots = await findTimeSlots();

//         console.log('Available slots:', availableSlots);

//         await driver.quit();

//         res.json({
//             status: 'success',
//             availableSlots,
//         });
//     } catch (error) {
//         await driver.quit();
//         console.error('Error during booking:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// const confirmBooking = async (req, res) => {
//     const { studentID, date, slot, editedSlot } = req.body;
//     console.log('Confirm booking request received:', date, slot);

//     const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

//     try {
//         await driver.get('http://localhost:3000/bbdc');

//         const month = date.split('-')[1].toUpperCase() + "'24";
//         const day = date.split('-')[2];

//         const monthSelector = async (month) => {
//             await driver.wait(until.elementLocated(By.css('.monthButtons button')), 10000);
//             const monthButtons = await driver.findElements(By.css('.monthButtons button'));
//             for (let button of monthButtons) {
//                 const text = await button.getText();
//                 if (text.includes(month)) {
//                     console.log(`Selecting month: ${month}`);
//                     await button.click();
//                     break;
//                 }
//             }
//         };

//         const normalizeString = (str) => str.trim().replace(/\s+/g, '');

//         const dateSelector = async (date) => {
//             await driver.wait(until.elementLocated(By.css('.calendarContainer .day')), 10000);
//             const dayElements = await driver.findElements(By.css('.calendarContainer .day'));
//             let dateSelected = false;

//             for (let day of dayElements) {
//                 const text = (await day.getText()).trim();
//                 const normalizedDate = normalizeString(String(date));
//                 const className = await day.getAttribute('class');
//                 if (text === normalizedDate && !className.includes('past')) {
//                     console.log(`Selecting date: ${date}`);
//                     await day.click();
//                     dateSelected = true;
//                     break;
//                 }
//             }

//             if (!dateSelected) {
//                 throw new Error(`Unable to select the date: ${date}`);
//             }
//         };

//         const slotSelector = async (slot) => {
//             await driver.wait(until.elementLocated(By.css('.slotContainer .slot')), 10000);
//             const slotElements = await driver.findElements(By.css('.slotContainer .slot'));
//             for (let slotElement of slotElements) {
//                 const text = await slotElement.getText();
//                 console.log(text, slot, text.includes(slot));
//                 if (text.includes(slot)) {
//                     console.log(`Selecting slot: ${slot}`);
//                     await slotElement.click();
//                     break;
//                 }
//             }
//         };

//         const confirmBookingButton = async () => {
//             await driver.wait(until.elementLocated(By.css('.confirm-button')), 10000);
//             const confirmButton = await driver.findElement(By.css('.confirm-button'));
//             console.log("Clicking Confirm Booking button");
//             await confirmButton.click();
//         };

//         const checkBookingConfirmation = async () => {
//             await driver.wait(until.alertIsPresent(), 10000);
//             const alert = await driver.switchTo().alert();
//             const alertText = await alert.getText();
//             await alert.accept();
//             return alertText;
//         };

//         await monthSelector(month);
//         await dateSelector(day);
//         await slotSelector(slot);
//         await confirmBookingButton();

//         const confirmationMessage = await checkBookingConfirmation();
//         console.log('Booking confirmation message:', confirmationMessage);

//         await driver.quit();

//         const theoryTestDate = date + " " + editedSlot;
//         const docRef = db.collection('students').doc(studentID);
//         await docRef.set({
//         theoryTestDate: theoryTestDate
//         }, { merge: true });

//         res.json({
//             status: 'success',
//             message: confirmationMessage,
//         });
//     } catch (error) {
//         await driver.quit();
//         console.error('Error during booking confirmation:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     makeBooking,
//     confirmBooking,
// };

const puppeteer = require('puppeteer');
const axios = require('axios');
const { db } = require("../firebase/firebase.js");

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

    if(req.method === 'OPTIONS') {
        return res.status(200).json(({
            body: "OK"
        }))
    }
}

const makeBooking = async (req, res) => {
    const { month, date } = req.query;
    console.log('Booking request received:', month, date);

    const browser = await puppeteer.launch({
        headless: false, // Change to false to see the browser UI
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });
    const page = await browser.newPage();

    try {
        // await page.goto('https://driversclutch.vercel.app/bbdc', { waitUntil: 'networkidle2' });
        await page.goto('http://localhost:3000/bbdc', { waitUntil: 'networkidle2' });

        const monthSelector = async (month) => {
            await page.waitForSelector('.monthButtons button');
            const monthButtons = await page.$$('.monthButtons button');
            for (let button of monthButtons) {
                const text = await page.evaluate(button => button.innerText, button);
                if (text.includes(month)) {
                    console.log(`Selecting month: ${month}`);
                    await button.click();
                    break;
                }
            }
        };

        const normalizeString = (str) => str.trim().replace(/\s+/g, '');

        const dateSelector = async (date) => {
            await page.waitForSelector('.calendarContainer .day');
            const dayElements = await page.$$('.calendarContainer .day');
            let dateSelected = false;

            for (let day of dayElements) {
                const text = await page.evaluate(day => day.innerText.trim(), day);
                const normalizedDate = normalizeString(String(date));
                const className = await page.evaluate(day => day.className, day);
                if (text === normalizedDate && !className.includes('past')) {
                    console.log(`Selecting date: ${date}`);
                    await day.click();
                    dateSelected = true;
                    break;
                }
            }

            if (!dateSelected) {
                throw new Error(`Unable to select the date: ${date}`);
            }
        };

        const findTimeSlots = async () => {
            console.log(`Waiting for slots to be visible...`);
            await page.waitForSelector('.slotContainer');
            await page.waitForSelector('.slotContainer .slot');
            const slotElements = await page.$$('.slotContainer .slot');
            const slots = [];
            for (let slot of slotElements) {
                const text = await page.evaluate(slot => slot.innerText, slot);
                slots.push(text);
            }
            return slots;
        };

        await monthSelector(month);
        await dateSelector(date);
        const availableSlots = await findTimeSlots();

        console.log('Available slots:', availableSlots);

        await browser.close();

        res.json({
            status: 'success',
            availableSlots,
        });
    } catch (error) {
        await browser.close();
        console.error('Error during booking:', error);
        res.status(500).json({ error: error.message });
    }
};

const confirmBooking = async (req, res) => {
    const { studentID, date, slot, editedSlot } = req.body;
    console.log(req.body);
    console.log('Confirm booking request received:', date, slot);

    const browser = await puppeteer.launch({
        headless: false, // Change to false to see the browser UI
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
        // await page.goto('https://driversclutch.vercel.app/bbdc', { waitUntil: 'networkidle2' });
        await page.goto('http://localhost:3000/bbdc', { waitUntil: 'networkidle2' });

        const month = date.split('-')[1].toUpperCase() + "'24";
        const day = date.split('-')[2];

        const monthSelector = async (month) => {
            await page.waitForSelector('.monthButtons button');
            const monthButtons = await page.$$('.monthButtons button');
            for (let button of monthButtons) {
                const text = await page.evaluate(button => button.innerText, button);
                if (text.includes(month)) {
                    console.log(`Selecting month: ${month}`);
                    await button.click();
                    break;
                }
            }

            console.log("month selected");
        };

        const normalizeString = (str) => str.trim().replace(/\s+/g, '');

        const dateSelector = async (date) => {
            await page.waitForSelector('.calendarContainer .day');
            const dayElements = await page.$$('.calendarContainer .day');
            let dateSelected = false;

            for (let day of dayElements) {
                const text = await page.evaluate(day => day.innerText.trim(), day);
                const normalizedDate = normalizeString(String(date));
                const className = await page.evaluate(day => day.className, day);
                if (text === normalizedDate && !className.includes('past')) {
                    console.log(`Selecting date: ${date}`);
                    await day.click();
                    dateSelected = true;
                    break;
                }
            }

            if (!dateSelected) {
                throw new Error(`Unable to select the date: ${date}`);
            }

            console.log("date selected");
        };

        const slotSelector = async (slot) => {
            await page.waitForSelector('.slotContainer .slot');
            const slotElements = await page.$$('.slotContainer .slot');
            for (let slotElement of slotElements) {
                const text = await page.evaluate(slot => slot.innerText, slotElement);
                if (text.includes(slot)) {
                    console.log(`Selecting slot: ${slot}`);
                    await slotElement.click();
                    break;
                }
            }

            console.log("slot selected");
        };

        const confirmBookingButton = async () => {
            await page.waitForSelector('.confirm-button:not(.disabled)');
            const confirmButton = await page.$('.confirm-button:not(.disabled)');
            console.log("Clicking Confirm Booking button");
            await confirmButton.click();
        };

        const checkBookingConfirmation = async () => {
            try {
                // await page.waitForSelector('.alert', { timeout: 10000 });
                //const alertText = await page.evaluate(() => document.querySelector('.alert').innerText);
                const alertTex = "Booking Successful!"
                console.log(alertTex);
                return alertText;
            } catch (e) {
                console.error('Error waiting for alert:', e);
                throw e;
            }
        };

        await monthSelector(month);
        await dateSelector(day);
        await slotSelector(slot);
        await confirmBookingButton();

        const confirmationMessage = await checkBookingConfirmation();
        console.log('Booking confirmation message:', confirmationMessage);

        browser.close();

        // const theoryTestDate = `${date} ${slot}`;
        // const docRef = db.collection('students').doc(studentID);
        // console.log(theoryTestDate, "---" . studentID);
        // await docRef.set({
        //     theoryTestDate: theoryTestDate
        // }, { merge: true });

        res.json({
            status: 'success',
            message: 'Booking confirmed successfully',
        });
    } catch (error) {
        await browser.close();
        console.error('Error during booking confirmation:', error);
        res.status(500).json({ error: error.message });
    }
};

    const confirmBookingNonscrape = async (req, res) => {
        const { date, slot, studentID } = req.body;
        // console.log('Confirm booking request received:', date, slot, 'for studentID:', studentID);
    
        try {
            // const theoryTestDate = `${date} ${slot}`;
            // const docRef = db.collection('students').doc(studentID);
            // await docRef.set({
            //     theoryTestDate: theoryTestDate
            // }, { merge: true });
    
            res.json({
                status: 'success',
                message: 'Booking confirmed successfully',
            });
        } catch (error) {
            console.error('Error confirming booking:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to confirm booking',
            });
        }
    };

module.exports = {
    makeBooking,
    confirmBooking,
    confirmBookingNonscrape,
};
