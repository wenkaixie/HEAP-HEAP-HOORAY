# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager
# from selenium.webdriver.chrome.options import Options
# import time
# import os

# def login_to_site(driver, username, password, captcha_solver):
#     try:
#         driver.get("https://booking.bbdc.sg/#/login?redirect=%2Fhome%2Findex")
#         print("Navigated to login page")
#         driver.save_screenshot('step1_navigated.png')
        
#         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@required='required' and @type='text']")))
#         username_input = driver.find_element(By.XPATH, "//input[@required='required' and @type='text']")
#         password_input = driver.find_element(By.XPATH, "//input[@required='required' and @type='password']")
#         print("Found username and password fields")
#         driver.save_screenshot('step2_found_fields.png')
        
#         username_input.send_keys(username)
#         password_input.send_keys(password)
#         print("Entered username and password")
#         driver.save_screenshot('step3_entered_credentials.png')
        
#         try:
#             login_button = driver.find_element(By.XPATH, "//span[@class='v-btn__content' and contains(text(), 'Access to Booking System')]")
#         except Exception as e:
#             print("Login button not found")
#             driver.save_screenshot('error_login_button_not_found.png')
#             with open("page_source.html", "w", encoding="utf-8") as f:
#                 f.write(driver.page_source)
#             raise e

#         login_button.click()
#         print("Clicked login button")
#         driver.save_screenshot('step4_clicked_login.png')

#         WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "v-image__image")))
#         print("Found captcha image")
#         driver.save_screenshot('step5_found_captcha.png')

#         captcha_image_style = driver.find_element(By.CLASS_NAME, "v-image__image").get_attribute("style")
#         print(f"Captcha Image Style: {captcha_image_style}")
#         try:
#             captcha_url = captcha_image_style.split('url("')[1].split('");')[0]
#         except IndexError as e:
#             print("Error parsing captcha URL. Full style attribute content:")
#             print(captcha_image_style)
#             driver.save_screenshot('error_parsing_captcha_url.png')
#             with open("page_source.html", "w", encoding="utf-8") as f:
#                 f.write(driver.page_source)
#             raise e

#         captcha_code = captcha_solver(captcha_url)
#         captcha_input = driver.find_element(By.XPATH, "//input[@required='required' and @type='text']")
#         captcha_input.send_keys(captcha_code)
#         print("Entered captcha code")
#         driver.save_screenshot('step6_entered_captcha.png')

#         try:
#             verify_button = driver.find_element(By.XPATH, "//span[@class='v-btn__content' and contains(text(), 'Verify')]")
#         except Exception as e:
#             print("Verify button not found")
#             driver.save_screenshot('error_verify_button_not_found.png')
#             with open("page_source.html", "w", encoding="utf-8") as f:
#                 f.write(driver.page_source)
#             raise e

#         verify_button.click()
#         print("Clicked verify button")
#         driver.save_screenshot('step7_clicked_verify.png')

#         # Check for a successful login
#         try:
#             WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Welcome Back')]")))
#             print("Login successful")
#             driver.save_screenshot('step8_login_successful.png')
#         except:
#             print("Login failed")
#             driver.save_screenshot('error_login_failed.png')
#             with open("page_source.html", "w", encoding="utf-8") as f:
#                 f.write(driver.page_source)
#             raise Exception("Login failed")

#     except Exception as e:
#         print(f"An error occurred: {e}")
#         driver.save_screenshot('error_general.png')
#         with open("page_source.html", "w", encoding="utf-8") as f:
#             f.write(driver.page_source)
#         raise e

# def captcha_solver(captcha_url):
#     print(f"Captcha URL: {captcha_url}")
#     return input("Please enter the captcha code displayed: ")

# def make_booking(username, password):
#     chrome_options = Options()
#     chrome_options.add_argument('--headless')
#     chrome_options.add_argument('--no-sandbox')
#     chrome_options.add_argument('--disable-dev-shm-usage')
#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

#     try:
#         login_to_site(driver, username, password, captcha_solver)
#     except Exception as e:
#         print(f"An error occurred: {e}")
#     finally:
#         driver.quit()

# if __name__ == "__main__":
#     import sys
#     make_booking(sys.argv[1], sys.argv[2])

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

# Initialize the WebDriver (make sure the path to your WebDriver is correct)
driver = webdriver.Chrome(executable_path='path_to_chromedriver')

# Define the URL of the website
url = "https://heap-heap-hooray-8w28.vercel.app/bbdc"
driver.get(url)

def monthSelector(month):
    """Select the month based on the input"""
    month_buttons = driver.find_elements(By.CSS_SELECTOR, ".monthButtons button")
    for button in month_buttons:
        if month in button.text:
            button.click()
            break

def dateSelector(date):
    """Select the date based on the input"""
    day_elements = driver.find_elements(By.CSS_SELECTOR, ".calendarContainer .day")
    for day in day_elements:
        if day.text == str(date) and "past" not in day.get_attribute("class"):
            day.click()
            break

def findTimeSlots():
    """Find and return the available time slots"""
    slot_elements = driver.find_elements(By.CSS_SELECTOR, ".slotContainer .slot")
    return [slot.text for slot in slot_elements]

def timeslotSelector(timeslot):
    """Select the time slot based on the input"""
    slot_elements = driver.find_elements(By.CSS_SELECTOR, ".slotContainer .slot")
    for slot in slot_elements:
        if timeslot in slot.text:
            slot.click()
            break

def bookingSelector():
    """Click the Confirm Booking button"""
    confirm_button = driver.find_element(By.CSS_SELECTOR, ".confirm-button")
    confirm_button.click()

def bookingConfirmation():
    """Read the popup to determine whether the booking is successful"""
    try:
        alert = WebDriverWait(driver, 10).until(EC.alert_is_present())
        alert_text = alert.text
        alert.accept()
        return alert_text
    except:
        return "No confirmation popup found"

# Example usage
monthSelector("AUG'24")
dateSelector(28)
print("Available time slots:", findTimeSlots())
timeslotSelector("SESSION 1 07:30 - 08:15 $5.45")
bookingSelector()
print("Booking confirmation message:", bookingConfirmation())

# Close the WebDriver
driver.quit()
