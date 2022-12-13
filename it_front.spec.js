import { By, Builder } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome.js";
import { suite } from "selenium-webdriver/testing/index.js";
import assert from "assert";

const FRONT_URL = "https://dreamy-pizzas-production.up.railway.app";

suite(function (env) {
  describe("First script", function () {
    let driver;
    let options = new Options()
    options.addArguments(["headless"])

    before(async function () {
      driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    });

    after(async () => await driver.quit());

    it("Probar sumar", async function () {
      await driver.get(FRONT_URL);

      let texto = await driver.findElement(By.id("texto"));
      let botonSumar = await driver.findElement(By.id("mas"));

      await botonSumar.click();

      await sleep(2000);

      let valor = await texto.getAttribute("value");
      assert.equal("1", valor);
    });

    it("Probar Resta", async function () {
      await driver.get(FRONT_URL);

      let texto = await driver.findElement(By.id("texto"))
      let botonRestar = await driver.findElement(By.id("menos"));

      await botonRestar.click();

      await sleep(3000);

      let valor = await texto.getAttribute("value");
      assert.equal(0, valor);
    });
  });
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}