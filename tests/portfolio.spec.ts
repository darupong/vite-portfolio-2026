import { test, expect } from "@playwright/test";

test.describe("Portfolio E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");
  });

  test("should load home page and display correct name", async ({ page }) => {
    // Check main title or introduction contains author name
    const introElement = page.locator("body");
    await expect(introElement).toContainText("Darupong");
  });

  test("should support compact language dropdown selector", async ({ page }) => {
    // Find the language dropdown trigger button
    const langBtn = page.getByLabel("Select language").first();
    await expect(langBtn).toBeVisible();

    // The dropdown menu should not be open by default
    await expect(langBtn).toHaveAttribute("aria-expanded", "false");

    // Click to open the language selector dropdown
    await langBtn.click();
    await expect(langBtn).toHaveAttribute("aria-expanded", "true");

    // Click to select Thai language option
    const thOption = page.locator("button:has-text('ไทย (TH)')");
    await expect(thOption).toBeVisible();
    await thOption.click();

    // Verify language changed to TH
    await expect(langBtn).toContainText("TH");

    // Check that education section displays high school in Thai
    const eduSection = page.locator("#education");
    await expect(eduSection).toContainText("โรงเรียนสุรศักดิ์มนตรี");
  });

  test("should render the education section containing high school detail", async ({ page }) => {
    // Wait for the education section to be visible
    const eduSection = page.locator("#education");
    await expect(eduSection).toBeVisible();

    // Verify High School Diploma and Surasakmontree School exist in the English view
    await expect(eduSection).toContainText("Surasakmontree School");
    await expect(eduSection).toContainText("High School Diploma");
    await expect(eduSection).toContainText("Science-Mathematics Program");
  });

  test("should support theme preset selections in controls menu", async ({ page }) => {
    // Locate the theme settings panel opener
    const settingsBtn = page.getByLabel("Open theme settings").first();
    await expect(settingsBtn).toBeVisible();

    // Open settings panel
    await settingsBtn.click();

    // Verify presets option block is present
    const presetLabel = page.locator("text=Presets");
    await expect(presetLabel).toBeVisible();

    // Select the "Christmas" preset option
    const christmasOption = page.getByRole("button", { name: "Christmas" }).first();
    await expect(christmasOption).toBeVisible();
    await christmasOption.click();

    // Verify that html theme preset matches the selected preset
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme-preset", "christmas");
  });

  test("should support running fastfetch and snake in the terminal", async ({ page }) => {
    // Locate terminal input
    const input = page.locator("#hero-terminal-input");
    await expect(input).toBeVisible();

    // Type fastfetch and press Enter
    await input.fill("fastfetch");
    await input.press("Enter");

    // Verify fastfetch outputs some visual content (e.g. preformatted tag)
    const terminalPre = page.locator("pre").first();
    await expect(terminalPre).toBeVisible();

    // Type snake and press Enter to launch the game
    await input.fill("snake");
    await input.press("Enter");

    // Verify that the Snake game board renders
    const gameBoard = page.locator("text=Retro Snake Game");
    await expect(gameBoard).toBeVisible();
    await expect(page.locator("text=Score:")).toBeVisible();

    // Click "Quit Game" to return to standard shell
    const quitBtn = page.getByRole("button", { name: "Quit Game" });
    await expect(quitBtn).toBeVisible();
    await quitBtn.click();

    // Input should be restored and active
    await expect(input).toBeVisible();
  });

  test("should support running Matrix Rain mode in terminal and exiting it", async ({ page }) => {
    const input = page.locator("#hero-terminal-input");
    await expect(input).toBeVisible();

    // Run matrix rain command
    await input.fill("matrix");
    await input.press("Enter");

    // Verify matrix rain is active and displays "EXIT MATRIX" button
    const exitBtn = page.getByRole("button", { name: "EXIT MATRIX" });
    await expect(exitBtn).toBeVisible();

    // Exit matrix rain
    await exitBtn.click();

    // Input should be restored and active
    await expect(input).toBeVisible();
  });

  test("should support interacting with the Procedural Chiptune Synthesizer", async ({ page }) => {
    // Locate the Synth card and verify initial standby state
    const standbyText = page.locator("text=SYNTH STANDBY");
    await expect(standbyText).toBeVisible();

    // Find the play button and click it
    const playBtn = page.getByLabel("Play procedural chiptune player");
    await expect(playBtn).toBeVisible();
    await playBtn.click();

    // Verify visualizer canvas is mounted and play button switches to mute
    const visualizerCanvas = page.locator("canvas").nth(1); // the second canvas on the page (first is Matrix/Snake if active, or just index 1 because terminal doesn't have canvas by default unless active)
    await expect(visualizerCanvas).toBeVisible();

    const muteBtn = page.getByLabel("Mute chiptune player");
    await expect(muteBtn).toBeVisible();

    // Toggle mute/pause
    await muteBtn.click();

    // Verify standby text returns
    await expect(standbyText).toBeVisible();
  });

  test("should support tab autocomplete and command history in terminal", async ({ page }) => {
    const input = page.locator("#hero-terminal-input");
    await expect(input).toBeVisible();

    // Type partial command 'fastfe'
    await input.fill("fastfe");
    
    // Press Tab to autocomplete
    await input.press("Tab");
    
    // Verify autocomplete completed to 'fastfetch'
    await expect(input).toHaveValue("fastfetch");
    
    // Press Enter to execute
    await input.press("Enter");
    
    // Clear terminal input and check ArrowUp history recall
    await input.fill("");
    await input.press("ArrowUp");
    await expect(input).toHaveValue("fastfetch");
  });

  test("should support guestbook signatures and display VisitorMap ping info", async ({ page }) => {
    const input = page.locator("#hero-terminal-input");
    await expect(input).toBeVisible();

    // Type guestbook sign command
    await input.fill('guestbook sign "Hello world, neung is awesome!"');
    await input.press("Enter");

    // Verify terminal output records signature
    const terminalOutput = page.locator("text=Signature recorded!");
    await expect(terminalOutput).toBeVisible();

    // Verify SVG world visitor map displays visitor counts
    const signaturesCount = page.locator("text=1 Signatures");
    await expect(signaturesCount).toBeVisible();
  });

  test("should support AI Chatbot conversation replies", async ({ page }) => {
    const input = page.locator("#hero-terminal-input");
    await expect(input).toBeVisible();

    // Type ai hello command
    await input.fill("ai hello");
    await input.press("Enter");

    // Verify AI reply output is rendered
    const aiOutput = page.locator("text=Neung-GPT");
    await expect(aiOutput).toBeVisible();
  });

  test("should support interacting with the AI Sandbox Pipeline visualizer", async ({ page }) => {
    // Verify AI Sandbox header is visible
    const sandboxHeader = page.locator("text=AI Generation Lab");
    await expect(sandboxHeader).toBeVisible();

    // Verify prompt presets exist
    const presetChip = page.locator("text=AI Portrait 👤");
    await expect(presetChip).toBeVisible();

    // Verify KSampler Node exists
    const samplerNode = page.locator("text=KSampler");
    await expect(samplerNode).toBeVisible();

    // Find and click the Generate button
    const generateBtn = page.getByRole("button", { name: "Generate AI Image ⚡" });
    await expect(generateBtn).toBeVisible();
    await generateBtn.click();

    // Verify the button text changes to Generating... during progress
    await expect(page.locator("text=Generating...")).toBeVisible();
  });

  test("should display the scroll-driven interactive career timeline", async ({ page }) => {
    // Locate the Experience section
    const expSection = page.locator("#experience");
    await expect(expSection).toBeVisible();

    // Verify timeline elements are loaded inside #experience to avoid strict-mode partner conflicts
    const imaiCard = expSection.locator("text=IMAI GROUP Co., Ltd.");
    await expect(imaiCard).toBeVisible();

    const vrCard = expSection.locator("text=Virtual Reality Co., Ltd.");
    await expect(vrCard).toBeVisible();
  });
});
