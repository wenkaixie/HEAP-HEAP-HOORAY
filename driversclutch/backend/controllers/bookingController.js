const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();

// Enable headless mode for faster execution
options.addArguments('headless');
options.addArguments('disable-gpu');
options.addArguments('window-size=1920x1080'); // Set window size for better element visibility

const makeBooking = async (req, res) => {
    const { month, date } = req.query;
    console.log('Booking request received:', month, date);

    const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // await driver.get('https://driversclutch.vercel.app/bbdc');
        await driver.get('http://localhost:3000/bbdc');

        const monthSelector = async (month) => {
            await driver.wait(until.elementLocated(By.css('.monthButtons button')), 10000);
            const monthButtons = await driver.findElements(By.css('.monthButtons button'));
            for (let button of monthButtons) {
                const text = await button.getText();
                if (text.includes(month)) {
                    console.log(`Selecting month: ${month}`);
                    await button.click();
                    break;
                }
            }
        };

        const normalizeString = (str) => str.trim().replace(/\s+/g, '');

        const dateSelector = async (date) => {
            await driver.wait(until.elementLocated(By.css('.calendarContainer .day')), 10000);
            const dayElements = await driver.findElements(By.css('.calendarContainer .day'));
            let dateSelected = false;

            for (let day of dayElements) {
                const text = (await day.getText()).trim();
                const normalizedDate = normalizeString(String(date));
                const className = await day.getAttribute('class');
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
            await driver.wait(until.elementLocated(By.css('.slotContainer')), 15000); // Wait for the slot container
            await driver.wait(until.elementsLocated(By.css('.slotContainer .slot')), 15000); // Wait for the slots within the container
            const slotElements = await driver.findElements(By.css('.slotContainer .slot'));
            const slots = [];
            for (let slot of slotElements) {
                const text = await slot.getText();
                slots.push(text);
            }
            return slots;
        };

        // Execute the steps
        await monthSelector(month);
        await dateSelector(date);
        const availableSlots = await findTimeSlots();

        console.log('Available slots:', availableSlots);

        await driver.quit();

        res.json({
            status: 'success',
            availableSlots,
        });
    } catch (error) {
        await driver.quit();
        console.error('Error during booking:', error);
        res.status(500).json({ error: error.message });
    }
};

const confirmBooking = async (req, res) => {
    const { date, slot } = req.body;
    console.log('Confirm booking request received:', date, slot);

    const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        await driver.get('http://localhost:3000/bbdc');

        const month = date.split('-')[1].toUpperCase() + "'24";
        const day = date.split('-')[2];

        const monthSelector = async (month) => {
            await driver.wait(until.elementLocated(By.css('.monthButtons button')), 10000);
            const monthButtons = await driver.findElements(By.css('.monthButtons button'));
            for (let button of monthButtons) {
                const text = await button.getText();
                if (text.includes(month)) {
                    console.log(`Selecting month: ${month}`);
                    await button.click();
                    break;
                }
            }
        };

        const normalizeString = (str) => str.trim().replace(/\s+/g, '');

        const dateSelector = async (date) => {
            await driver.wait(until.elementLocated(By.css('.calendarContainer .day')), 10000);
            const dayElements = await driver.findElements(By.css('.calendarContainer .day'));
            let dateSelected = false;

            for (let day of dayElements) {
                const text = (await day.getText()).trim();
                const normalizedDate = normalizeString(String(date));
                const className = await day.getAttribute('class');
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

        const slotSelector = async (slot) => {
            await driver.wait(until.elementLocated(By.css('.slotContainer .slot')), 10000);
            const slotElements = await driver.findElements(By.css('.slotContainer .slot'));
            for (let slotElement of slotElements) {
                const text = await slotElement.getText();
                console.log(text, slot, text.includes(slot));
                if (text.includes(slot)) {
                    console.log(`Selecting slot: ${slot}`);
                    await slotElement.click();
                    break;
                }
            }
        };

        const confirmBookingButton = async () => {
            await driver.wait(until.elementLocated(By.css('.confirm-button')), 10000);
            const confirmButton = await driver.findElement(By.css('.confirm-button'));
            console.log("Clicking Confirm Booking button");
            await confirmButton.click();
        };

        const checkBookingConfirmation = async () => {
            await driver.wait(until.alertIsPresent(), 10000);
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            await alert.accept();
            return alertText;
        };

        await monthSelector(month);
        await dateSelector(day);
        await slotSelector(slot);
        await confirmBookingButton();

        const confirmationMessage = await checkBookingConfirmation();
        console.log('Booking confirmation message:', confirmationMessage);

        await driver.quit();

        res.json({
            status: 'success',
            message: confirmationMessage,
        });
    } catch (error) {
        await driver.quit();
        console.error('Error during booking confirmation:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    makeBooking,
    confirmBooking,
};
