(() => {
            const STORAGE_KEY = "flousi-data-v1";
            const SETTINGS_KEY = "flousi-settings-v1";
            const NOTIFICATIONS_KEY = "flousi-notifications-v1";
            const AUTH_KEY = "flousi-auth-token-v1";
            const ACCOUNT_EMAIL_KEY = "flousi-account-email-v1";
            const GUEST_DATA_KEY = "flousi-guest-data-v1";
            const SYNCED_DATA_KEY = "flousi-synced-data-v1";
            const SUPPORTED_CURRENCIES = ["MAD", "USD", "EUR", "GBP", "CAD", "SAR", "AED"];
            const API_BASE_URL = String(window.FLOUSI_API_URL || "").replace(/\/+$/, "");
            const translations = {
                ar: {
                    brandCaption: "ÙÙ„ÙˆØ³Ùƒ ÙˆØ§Ø¶Ø­Ø©ØŒ ÙˆØ±Ø§Ø³Ùƒ Ù…Ø±ØªØ§Ø­", introTitle: "Ù…Ø±Ø­Ø¨Ø§ Ø¨Ùƒ ÙÙÙ„ÙˆØ³ÙŠ", introCaption: "ÙÙ„ÙˆØ³Ùƒ ÙˆØ§Ø¶Ø­Ø©ØŒ ÙˆØ±Ø§Ø³Ùƒ Ù…Ø±ØªØ§Ø­",
                    introStart: "Ø¨Ø¯Ø§ Ø§Ù„ØªØ¬Ø±Ø¨Ø©ã€€â™«",
                    loginTitle: "Ù…Ø±Ø­Ø¨Ø§ Ø¨Ø¹ÙˆØ¯ØªÙƒ", loginCaption: "Ø¯Ø®Ù„ Ù„Ù„Ø­Ø³Ø§Ø¨ Ø¯ÙŠØ§Ù„Ùƒ Ø¨Ø§Ø´ ØªØªØ§Ø¨Ø¹ ÙÙ„ÙˆØ³Ùƒ.", loginEmail: "Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ",
                    loginPassword: "ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±", showPassword: "Ø¥Ø¸Ù‡Ø§Ø±", hidePassword: "Ø¥Ø®ÙØ§Ø¡",
                    loginNotice: "Ø¯Ø®Ù„ Ù„Ù„Ø­Ø³Ø§Ø¨ Ø£Ùˆ Ø£Ù†Ø´Ø¦ Ø­Ø³Ø§Ø¨Ø§Ù‹ Ø¨Ø§Ø´ ØªØ²Ø§Ù…Ù† Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù…Ø¹ Ø®Ø§Ø¯Ù… Flousi.",
                    loginFeedback: "Ù…Ø§ Ù‚Ø¯Ø±Ù†Ø§Ø´ Ù†ØªØ§ØµÙ„Ùˆ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…. ØªØ£ÙƒØ¯ Ù…Ù† ØªØ´ØºÙŠÙ„Ù‡ ÙˆØ­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.", loginSubmit: "Ø¯Ø®ÙˆÙ„",
                    registerTitle: "Ø£Ù†Ø´Ø¦ Ø­Ø³Ø§Ø¨ Flousi", registerCaption: "Ø£Ù†Ø´Ø¦ Ø­Ø³Ø§Ø¨Ø§Ù‹ Ø¨Ø§Ø´ ØªØ¨Ù‚Ù‰ Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù…ØªØ²Ø§Ù…Ù†Ø© Ø¨ÙŠÙ† Ø§Ù„Ø£Ø¬Ù‡Ø²Ø©.",
                    registerSubmit: "Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø­Ø³Ø§Ø¨", switchToRegister: "Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ø¬Ø¯ÙŠØ¯", switchToLogin: "Ø¹Ù†Ø¯ÙŠ Ø­Ø³Ø§Ø¨",
                    apiInvalidLogin: "Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ø£Ùˆ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± ØºÙŠØ± ØµØ­ÙŠØ­Ø©.", apiEmailExists: "Ù‡Ø§Ø¯ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ù…Ø³Ø¬Ù„ Ù…Ù† Ù‚Ø¨Ù„.",
                    apiInvalidEmail: "Ø¯Ø®Ù„ Ø¨Ø±ÙŠØ¯ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ØµØ­ÙŠØ­.",
                    apiInvalidData: "Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ØºÙŠØ± ØµØ­ÙŠØ­Ø© ÙˆÙ…Ø§ ØªØ³Ø¬Ù„Ø§ØªØ´.", apiUnavailable: "Ù…Ø§ Ù‚Ø¯Ø±Ù†Ø§Ø´ Ù†ØªØ§ØµÙ„Ùˆ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…. Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ø§Ù„Ù…Ø­Ù„ÙŠØ© Ø¨Ø§Ù‚ÙŠØ© Ù…Ø­ÙÙˆØ¸Ø©.",
                    apiGenericError: "ÙˆÙ‚Ø¹ Ù…Ø´ÙƒÙ„ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…. Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.",
                    accountCreated: "ØªØ®Ù„Ù‚ Ø§Ù„Ø­Ø³Ø§Ø¨ ÙˆØªÙØ¹Ù‘Ù„Ø§Øª Ø§Ù„Ù…Ø²Ø§Ù…Ù†Ø©.", accountSignedIn: "Ø¯Ø®Ù„ØªÙŠ Ù„Ù„Ø­Ø³Ø§Ø¨ ÙˆØªØ­Ø¯Ù‘Ø«Ø§Øª Ø¨ÙŠØ§Ù†Ø§ØªÙƒ.",
                    signedOut: "Ø®Ø±Ø¬ØªÙŠ Ù…Ù† Ø§Ù„Ø­Ø³Ø§Ø¨. Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ø¨Ø§Ù‚ÙŠØ© Ù…Ø­ÙÙˆØ¸Ø© ÙÙ‡Ø§Ø¯ Ø§Ù„Ø¬Ù‡Ø§Ø².",
                    accountStatusGuest: "ØªØ³ØªØ¹Ù…Ù„ Flousi Ø¨Ù„Ø§ Ø­Ø³Ø§Ø¨.", accountEmail: "Ø§Ù„Ø­Ø³Ø§Ø¨: {email}", connectAccount: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ ÙˆØ§Ù„Ù…Ø²Ø§Ù…Ù†Ø©",
                    signOut: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬", passwordTooShort: "ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø®Ø§ØµÙ‡Ø§ ØªÙƒÙˆÙ† Ù…Ù† 10 Ø­Ø±ÙˆÙ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„.",
                    syncFailed: "ØªØ¹Ø°Ø± Ø­ÙØ¸ Ø§Ù„ØªØºÙŠÙŠØ±Ø§Øª ÙØ§Ù„Ø­Ø³Ø§Ø¨. Ø¨Ù‚Ø§Øª Ù…Ø­ÙÙˆØ¸Ø© Ù…Ø­Ù„ÙŠØ§Ù‹Ø› ØªØ£ÙƒØ¯ Ù…Ù† Ø§Ù„Ø®Ø§Ø¯Ù… ÙˆØ­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.",
                    continueAsGuest: "ÙƒÙ…Ù„ Ø¨Ù„Ø§ Ø­Ø³Ø§Ø¨", backToWelcome: "Ø±Ø¬Ø¹ Ù„Ù„Ø¨Ø¯Ø§ÙŠØ©",
                    settings: "âš™ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª", addTransaction: "Ø²ÙŠØ¯ Ø¹Ù…Ù„ÙŠØ©", welcome: "Ø§Ù„Ø³Ù„Ø§Ù…! Ù‡Ø§Ø¯ÙŠ Ù†Ø¸Ø±Ø© Ø¹Ù„Ù‰ ÙÙ„ÙˆØ³Ùƒ",
                    navHome: "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©", navTransactions: "Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª", navTrends: "Ø§Ù„ØªØ·ÙˆØ±", navGoals: "Ø§Ù„Ø£Ù‡Ø¯Ø§Ù", mainNavigation: "Ø§Ù„ØªÙ†Ù‚Ù„ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ",
                    mobileWelcome: "Ù…Ø±Ø­Ø¨Ø§ Ø¨ÙŠÙƒ",
                    monthSelector: "Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø´Ù‡Ø±", transactionType: "Ù†ÙˆØ¹ Ø§Ù„Ø¹Ù…Ù„ÙŠØ©", budgetProgress: "Ù†Ø³Ø¨Ø© Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ù…Ø³ØªØ¹Ù…Ù„Ø©",
                    trendTitle: "Ø§Ù„Ø¥Ø­ØµØ§Ø¦ÙŠØ§Øª", categoryChartTitle: "Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ Ø­Ø³Ø¨ Ø§Ù„ØµÙ†Ù", comparisonTitle: "Ø§Ù„Ø¯Ø®Ù„ Ù…Ù‚Ø§Ø¨Ù„ Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ",
                    trendSubtitle: "Ø¢Ø®Ø± 6 Ø´Ù‡ÙˆØ±", trendIncome: "Ø§Ù„Ø¯Ø®Ù„", trendExpenses: "Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ", trendPeriod: "Ø§Ù„ÙØªØ±Ø© Ø§Ù„Ø²Ù…Ù†ÙŠØ©",
                    trendWeek: "Ø£Ø³Ø¨ÙˆØ¹", trendMonth: "Ø´Ù‡Ø±", trendYear: "Ø¹Ø§Ù…", trendWeekRange: "Ø¢Ø®Ø± 7 Ø£ÙŠØ§Ù…",
                    trendMonthRange: "Ø¢Ø®Ø± 6 Ø´Ù‡ÙˆØ±", trendYearRange: "Ù‡Ø§Ø¯ Ø§Ù„Ø¹Ø§Ù…", categoryChartEmpty: "Ø³Ø¬Ù‘Ù„ Ù…ØµØ§Ø±ÙŠÙÙƒ Ø¨Ø§Ø´ ÙŠØ¨Ø§Ù† Ø§Ù„ØªÙˆØ²ÙŠØ¹ Ø­Ø³Ø¨ Ø§Ù„ØµÙ†Ù.",
                    trendIncomeAria: "Ø§Ù„Ø¯Ø®Ù„", trendExpensesAria: "Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ",
                    savingsImproved: "ØµØ§ÙÙŠ Ø§Ù„ØªÙˆÙÙŠØ± ØªØ²Ø§Ø¯ Ø¨Ù€{amount} Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ø§Ù„ÙØªØ±Ø© Ø§Ù„Ù„ÙŠ ÙØ§ØªØª.",
                    savingsReduced: "ØµØ§ÙÙŠ Ø§Ù„ØªÙˆÙÙŠØ± Ù†Ù‚Øµ Ø¨Ù€{amount} Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ø§Ù„ÙØªØ±Ø© Ø§Ù„Ù„ÙŠ ÙØ§ØªØª.",
                    savingsSame: "ØµØ§ÙÙŠ Ø§Ù„ØªÙˆÙÙŠØ± Ø¨Ù‚Ù‰ ÙƒÙŠÙ ÙƒÙŠÙ Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ø§Ù„ÙØªØ±Ø© Ø§Ù„Ù„ÙŠ ÙØ§ØªØª.",
                    notificationsTitle: "Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª", notificationsEmpty: "Ù…Ø§ ÙƒØ§ÙŠÙ† Ø­ØªÙ‰ Ø¥Ø´Ø¹Ø§Ø± Ø¬Ø¯ÙŠØ¯.",
                    notificationsButton: "Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª", markNotificationsRead: "ØªØ¹Ù„ÙŠÙ… Ø§Ù„ÙƒÙ„ ÙƒÙ…Ù‚Ø±ÙˆØ¡", clearNotifications: "Ù…Ø³Ø­ Ø§Ù„ÙƒÙ„",
                    notificationSaveError: "Ù…Ø§ Ù‚Ø¯Ø±Ù†Ø§Ø´ Ù†Ø­ÙØ¸Ùˆ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª.",
                    budgetNotificationTitle: "ØªÙ†Ø¨ÙŠÙ‡ Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©", savingsNotificationTitle: "ØªÙ†Ø¨ÙŠÙ‡ Ø§Ù„ØªÙˆÙÙŠØ±",
                    notificationContribution: "Ø²Ø¯ØªÙŠ {amount} Ù„Ù‡Ø¯Ù Â«{goal}Â».", notificationGoalReached: "ÙˆØµÙ„ØªÙŠ Ù„Ù‡Ø¯Ù Â«{goal}Â» Ø¯ÙŠØ§Ù„ Ø§Ù„ØªÙˆÙÙŠØ±!",
                    savingsTreeTitle: "Ø´Ø¬Ø±Ø© Ø§Ù„ØªÙˆÙÙŠØ± Ø¯ÙŠØ§Ù„ÙŠ", savingsTreeCaption: "ÙƒÙ„Ù…Ø§ ÙˆÙØ±Øª Ø£ÙƒØ«Ø±ØŒ ÙƒØ¨Ø±Øª Ø´Ø¬Ø±ØªÙƒ.",
                    savingsTreeEmpty: "Ø²ÙŠØ¯ Ù‡Ø¯Ù Ø¯ÙŠØ§Ù„ Ø§Ù„ØªÙˆÙÙŠØ± Ø¨Ø§Ø´ ØªØºØ±Ø³ Ø£ÙˆÙ„ Ø¨Ø°Ø±Ø©.", savingsTreeStage0: "Ø¨Ø¯Ø§ Ø§Ù„ØªÙˆÙÙŠØ± Ø¯ÙŠØ§Ù„Ùƒ Ø¨Ø§Ø´ ØªÙƒØ¨Ø± Ø§Ù„Ø´Ø¬Ø±Ø©.",
                    savingsTreeStage1: "Ø§Ù„Ø¨Ø°Ø±Ø© Ø¨Ø¯Ø§Øª ÙƒØªØ·Ù„Ø¹!",
                    savingsTreeStage2: "Ø§Ù„Ø´Ø¬ÙŠØ±Ø© Ø¯ÙŠØ§Ù„Ùƒ ÙƒØªÙƒØ¨Ø±.", savingsTreeStage3: "Ø´Ø¬Ø±ØªÙƒ ÙƒØªÙ‚ÙˆÙ‰ Ù…Ø¹ ÙƒÙ„ ØªÙˆÙÙŠØ±.",
                    savingsTreeStage4: "Ø¨Ø§Ù‚ÙŠ ØºÙŠØ± Ø´ÙˆÙŠØ© ÙˆØªÙˆØµÙ„ Ù„Ù‡Ø¯ÙÙƒ!", savingsTreeStage5: "Ø´Ø¬Ø±ØªÙƒ ÙƒØ¨Ø±Øª ÙˆÙ‡Ø¯ÙÙƒ ØªØ­Ù‚Ù‚!",
                    savingsTreeProgress: "ØªÙ‚Ø¯Ù… Ø´Ø¬Ø±Ø© Ø§Ù„ØªÙˆÙÙŠØ±",
                    goalsTitle: "Ø£Ù‡Ø¯Ø§Ù Ø§Ù„ØªÙˆÙÙŠØ±", goalsSubtitle: "ØªØ¨Ø¹ Ø§Ù„ØªÙ‚Ø¯Ù… Ø¯ÙŠØ§Ù„Ùƒ Ù†Ø­Ùˆ Ø£Ù‡Ø¯Ø§ÙÙƒ", addGoal: "Ø²ÙŠØ¯ Ù‡Ø¯Ù", goalEmpty: "Ù…Ø§ Ø¹Ù†Ø¯Ùƒ Ø­ØªÙ‰ Ù‡Ø¯Ù Ø¯ÙŠØ§Ù„ Ø§Ù„ØªÙˆÙÙŠØ±. Ø²ÙŠØ¯ Ù‡Ø¯ÙÙƒ Ø§Ù„Ø£ÙˆÙ„!",
                    goalModal: "Ù‡Ø¯Ù ØªÙˆÙÙŠØ± Ø¬Ø¯ÙŠØ¯", goalName: "Ø§Ø³Ù… Ø§Ù„Ù‡Ø¯Ù", goalNamePlaceholder: "Ù…Ø«Ø§Ù„: Ø¹Ø·Ù„Ø©ØŒ Ø­Ø§Ø³ÙˆØ¨...", goalTarget: "Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„Ù„ÙŠ Ø¨Ø§ØºÙŠ ØªØ¬Ù…Ø¹",
                    goalTargetPlaceholder: "Ù…Ø«Ø§Ù„: 10000", saveGoal: "Ø­ÙØ¸ Ø§Ù„Ù‡Ø¯Ù", contribute: "Ø²ÙŠØ¯ Ù„Ù„ØªÙˆÙÙŠØ±", contributionAmount: "Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„Ù„ÙŠ ÙˆÙØ±ØªÙŠ",
                    saveContribution: "Ø­ÙØ¸ Ø§Ù„ØªÙˆÙÙŠØ±", addContribution: "Ø²ÙŠØ¯ ØªÙˆÙÙŠØ±", deleteGoal: "Ø­Ø°Ù Ø§Ù„Ù‡Ø¯Ù", goalCompleted: "ÙƒÙ…Ù„ØªÙŠ Ø§Ù„Ù‡Ø¯Ù!", goalProgress: "Ø§Ù„ØªÙ‚Ø¯Ù…",
                    goalInvalid: "Ø¯Ø®Ù„ Ø§Ø³Ù… ÙˆÙ…Ø¨Ù„Øº ØµØ­ÙŠØ­ÙŠÙ† Ù„Ù„Ù‡Ø¯Ù.", goalSaved: "ØªØ³Ø¬Ù„ Ù‡Ø¯Ù Ø§Ù„ØªÙˆÙÙŠØ±.", goalDeleted: "ØªØ­Ø°Ù Ù‡Ø¯Ù Ø§Ù„ØªÙˆÙÙŠØ±.",
                    contributionInvalid: "Ø¯Ø®Ù„ Ù…Ø¨Ù„Øº ØµØ­ÙŠØ­ Ù„Ù„ØªÙˆÙÙŠØ±.", contributionTooHigh: "Ø§Ù„Ù…Ø¨Ù„Øº Ø£ÙƒØ¨Ø± Ù…Ù† Ø§Ù„Ù„ÙŠ Ø¨Ø§Ù‚ÙŠ Ø¨Ø§Ø´ ØªÙƒÙ…Ù„ Ø§Ù„Ù‡Ø¯Ù.",
                    contributionSaved: "ØªØ³Ø¬Ù„ Ø§Ù„ØªÙˆÙÙŠØ± Ø¯ÙŠØ§Ù„Ùƒ.", budgetWarning: "ØªÙ†Ø¨ÙŠÙ‡: ÙˆØµÙ„ØªÙŠ Ù„Ù€80% Ù…Ù† Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø´Ù‡Ø±ÙŠØ©.",
                    budgetExceededAlert: "ØªÙ†Ø¨ÙŠÙ‡: ÙˆØµÙ„ØªÙŠ Ø£Ùˆ ÙØªÙŠØªÙŠ Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø´Ù‡Ø±ÙŠØ©!",
                    moneyTipTitle: "Ù†ØµÙŠØ­Ø© Ù„ÙŠÙƒ", moneyTipStart: "Ø³Ø¬Ù‘Ù„ Ø¹Ù…Ù„ÙŠØ§ØªÙƒ Ø¨Ø§Ø´ Ù†Ø¹Ø·ÙŠÙˆÙƒ Ù†ØµÙŠØ­Ø© Ø¹Ù„Ù‰ Ø­Ø³Ø§Ø¨ Ù…ØµØ§Ø±ÙŠÙÙƒ.",
                    moneyTipOverBudget: "ØªØ¬Ø§ÙˆØ²ØªÙŠ Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø´Ù‡Ø±ÙŠØ©. Ø±Ø§Ø¬Ø¹ Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ Ø§Ù„Ø¬Ø§ÙŠØ© ÙˆØ­Ø§ÙˆÙ„ ØªØ£Ø¬Ù„ Ø§Ù„Ù„ÙŠ Ù…Ø§Ø´ÙŠ Ø¶Ø±ÙˆØ±ÙŠ.",
                    moneyTipNearBudget: "ÙˆØµÙ„ØªÙŠ Ù„Ù€{percent}% Ù…Ù† Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©. Ø±Ø§Ù‚Ø¨ Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ Ø¯ÙŠØ§Ù„ Ø¨Ø§Ù‚ÙŠ Ø§Ù„Ø´Ù‡Ø±.",
                    moneyTipBalance: "Ù…ØµØ§Ø±ÙŠÙÙƒ Ø£ÙƒØ«Ø± Ù…Ù† Ø§Ù„Ø¯Ø®Ù„ Ø§Ù„Ù„ÙŠ Ø³Ø¬Ù„ØªÙŠ. Ø±Ø§Ø¬Ø¹ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø¨Ø§Ø´ ØªØ¹Ø±Ù ÙÙŠÙ† ØªÙ‚Ø¯Ø± ØªÙ†Ù‚Øµ.",
                    moneyTipSetBudget: "Ù…Ø§Ø²Ø§Ù„ Ù…Ø§ Ø­Ø¯Ø¯ØªÙŠØ´ Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ù„Ù„Ø´Ù‡Ø±. Ø­Ø¯Ø¯Ù‡Ø§ Ø¨Ø§Ø´ ØªØ¨Ù‚Ù‰ Ø¹Ø§Ø±Ù Ø´Ø­Ø§Ù„ ØªÙ‚Ø¯Ø± ØªØµØ±Ù.",
                    moneyTipCategory: "Ø§Ù„ØµÙ†Ù Ø§Ù„Ù„ÙŠ ÙÙŠÙ‡ Ø£ÙƒØ¨Ø± Ù…ØµØ§Ø±ÙŠÙ Ù‡Ùˆ {category} Ø¨Ù€{percent}% Ù…Ù† Ù…Ø¬Ù…ÙˆØ¹ Ù…ØµØ§Ø±ÙŠÙÙƒ. Ø±Ø§Ø¬Ø¹ ÙˆØ§Ø´ ØªÙ‚Ø¯Ø± ØªÙ†Ù‚Øµ Ù…Ù†Ùˆ.",
                    moneyTipSave: "Ø¨Ø§Ù‚ÙŠ Ø¹Ù†Ø¯Ùƒ ÙØ§Ø¦Ø¶ Ø¨ÙŠÙ† Ø§Ù„Ø¯Ø®Ù„ ÙˆØ§Ù„Ù…ØµØ§Ø±ÙŠÙ. ÙÙƒØ± ØªØ®ØµØµ Ø¬Ø²Ø¡ Ù…Ù†Ùˆ Ù„Ù‡Ø¯Ù ØªÙˆÙÙŠØ±.",
                    dailyChallengeTitle: "ØªØ­Ø¯Ù‘ÙŠ Ø§Ù„ØªÙˆÙÙŠØ± Ø¯ÙŠØ§Ù„ Ø§Ù„ÙŠÙˆÙ…", dailyChallengeCaption: "Ø¬Ø±Ù‘Ø¨ ØªØ­Ø· Ù‡Ø§Ø¯ Ø§Ù„Ù…Ø¨Ù„Øº Ø¹Ù„Ù‰ Ø¬Ù†Ø¨ Ø§Ù„ÙŠÙˆÙ….",
                    dailyChallengeStreak: "ðŸ”¥ {count} Ø£ÙŠØ§Ù… Ù…ØªØªØ§Ø¨Ø¹Ø©", dailyChallengeButton: "Ø¯Ø±Øª Ø§Ù„ØªØ­Ø¯Ù‘ÙŠ Ø§Ù„ÙŠÙˆÙ…!",
                    dailyChallengeDone: "ÙˆØ§Ø¹Ø±! ÙƒÙ…Ù„ØªÙŠ ØªØ­Ø¯Ù‘ÙŠ Ø§Ù„ÙŠÙˆÙ…. Ù†ÙƒÙ…Ù„Ùˆ ØºØ¯Ø§! ðŸŽ‰",
                    subtitle: "ØªØ¨Ø¹ Ø§Ù„Ø¯Ø®Ù„ ÙˆØ§Ù„Ù…ØµØ§Ø±ÙŠÙ Ø¯ÙŠØ§Ù„Ùƒ ÙˆØ®Ø·Ø· Ù„Ù„Ø´Ù‡Ø± Ø¨Ø±Ø§Ø­Ø©.", balance: "Ø§Ù„Ø±ØµÙŠØ¯ Ø§Ù„ØµØ§ÙÙŠ", income: "Ù…Ø¬Ù…ÙˆØ¹ Ø§Ù„Ø¯Ø®Ù„", expenses: "Ù…Ø¬Ù…ÙˆØ¹ Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ",
                    budgetTitle: "Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ Ø§Ù„Ø´Ù‡Ø±ÙŠØ©", budgetDefault: "Ø­Ø¯Ø¯ Ù…ÙŠØ²Ø§Ù†ÙŠØªÙƒ Ø¨Ø§Ø´ ØªØ¨Ù‚Ù‰ Ù…ØªØ­ÙƒÙ… ÙÙ…ØµØ§Ø±ÙŠÙÙƒ.",
                    budgetNotSet: "Ù…Ø§ ØªØ­Ø¯Ø¯Ø§ØªØ´", budgetSet: "Ø­Ø¯Ø¯ Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©", budgetChange: "Ø¨Ø¯Ù„ Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©",
                    budgetUsed: "Ø§Ø³ØªØ¹Ù…Ù„ØªÙŠ {percent}% Ù…Ù† Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø¯ÙŠØ§Ù„Ùƒ.", budgetRemaining: "Ø¨Ø§Ù‚ÙŠ Ù„ÙŠÙƒ {amount}", budgetOver: "ÙØªÙŠØªÙŠ Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø¨Ù€ {amount}",
                    startBudget: "Ø¨Ø¯Ø§ Ø¨ØªØ­Ø¯ÙŠØ¯ Ù…ÙŠØ²Ø§Ù†ÙŠØªÙƒ Ø§Ù„Ø´Ù‡Ø±ÙŠØ©.", transactions: "Ø¢Ø®Ø± Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª", transactionCountOne: "{count} Ø¹Ù…Ù„ÙŠØ© Ù‡Ø§Ø¯ Ø§Ù„Ø´Ù‡Ø±", transactionCountMany: "{count} Ø¹Ù…Ù„ÙŠØ§Øª Ù‡Ø§Ø¯ Ø§Ù„Ø´Ù‡Ø±",
                    filterLabel: "ØªØµÙÙŠØ© Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª", filterAll: "ÙƒÙ„ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª", filterExpenses: "Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ", filterIncome: "Ø§Ù„Ø¯Ø®Ù„",
                    categoriesTitle: "ÙÙŠÙ† Ù…Ø´Ø§Ùˆ Ù…ØµØ§Ø±ÙŠÙÙƒØŸ", categoriesSubtitle: "Ø§Ù„ØªÙˆØ²ÙŠØ¹ Ø­Ø³Ø¨ Ø§Ù„ØµÙ†Ù", emptyFilter: "Ù…Ø§ ÙƒØ§ÙŠÙ†Ø§Ø´ Ø¹Ù…Ù„ÙŠØ§Øª Ø¨Ù‡Ø§Ø¯ Ø§Ù„ØªØµÙÙŠØ©.",
                    emptyTransactions: "Ù…Ø§Ø²Ø§Ù„ Ù…Ø§ Ø²Ø¯ØªÙŠ Ø­ØªÙ‰ Ø¹Ù…Ù„ÙŠØ©. Ø¨Ø¯Ø§ ÙˆØ³Ø¬Ù„ Ø£ÙˆÙ„ Ù…ØµØ±ÙˆÙ Ø£Ùˆ Ø¯Ø®Ù„.", emptyCategories: "Ø§Ù„ØªØµÙ†ÙŠÙØ§Øª ØºØ§Ø¯ÙŠ ÙŠØ¨Ø§Ù†ÙˆØ§ Ù…Ù„ÙŠ ØªØ³Ø¬Ù„ Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ.",
                    privacy: "Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¶ÙŠÙ ÙƒØªØ¨Ù‚Ù‰ ÙÙ‡Ø§Ø¯ Ø§Ù„Ø¬Ù‡Ø§Ø²ØŒ ÙˆØ§Ù„Ø­Ø³Ø§Ø¨ ÙƒÙŠØ²Ø§Ù…Ù†Ù‡Ø§ Ù…Ø¹ Ø§Ù„Ø®Ø§Ø¯Ù….", transactionModal: "Ø²ÙŠØ¯ Ø¹Ù…Ù„ÙŠØ© Ø¬Ø¯ÙŠØ¯Ø©", close: "Ø³Ø¯", expense: "Ù…ØµØ±ÙˆÙ", incomeType: "Ø¯Ø®Ù„",
                    description: "Ø§Ù„ÙˆØµÙ", descriptionPlaceholder: "Ù…Ø«Ø§Ù„: Ù‚Ù‡ÙˆØ©ØŒ Ø®Ù„ØµØ© Ø§Ù„Ø´Ù‡Ø±...", amount: "Ø§Ù„Ù…Ø¨Ù„Øº ({currency})", category: "Ø§Ù„ØµÙ†Ù", date: "Ø§Ù„ØªØ§Ø±ÙŠØ®",
                    saveTransaction: "Ø­ÙØ¸ Ø§Ù„Ø¹Ù…Ù„ÙŠØ©", budgetModal: "Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø´Ù‡Ø±ÙŠØ©", budgetCopy: "Ø¯Ø®Ù„ Ø´Ø­Ø§Ù„ Ø¨Ø§ØºÙŠ ØªØµØ±Ù ÙƒØ­Ø¯ Ø£Ù‚ØµÙ‰ ÙÙ‡Ø§Ø¯ Ø§Ù„Ø´Ù‡Ø±.",
                    budgetInput: "Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© ({currency})", budgetPlaceholder: "Ù…Ø«Ø§Ù„: 3000",
                    settingsTitle: "Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚", helpButton: "Ù…Ø³Ø§Ø¹Ø¯Ø©", helpTitle: "ÙƒÙŠÙØ§Ø´ ØªØ³ØªØ¹Ù…Ù„ ÙÙ„ÙˆØ³ÙŠ",
                    helpIntro: "Ø¨Ø¯Ø§ Ø¨ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø¯ÙŠØ§Ù„ÙƒØŒ ÙˆÙ…Ù† Ø¨Ø¹Ø¯ ØªØªØ¨Ø¹ Ù…ÙŠØ²Ø§Ù†ÙŠØªÙƒ ÙˆØ£Ù‡Ø¯Ø§Ù Ø§Ù„ØªÙˆÙÙŠØ±.",
                    helpTransactions: "Ø§Ø³ØªØ¹Ù…Ù„ Ø²Ø± + Ø¨Ø§Ø´ ØªØ³Ø¬Ù„ Ø§Ù„Ù…ØµØ§Ø±ÙŠÙ Ø£Ùˆ Ø§Ù„Ù…Ø¯Ø§Ø®ÙŠÙ„ØŒ ÙˆØ²ÙŠØ¯ Ø§Ù„ÙˆØµÙ ÙˆØ§Ù„Ù…Ø¨Ù„Øº ÙˆØ§Ù„ØªØ§Ø±ÙŠØ®.",
                    helpBudgetGoals: "Ø­Ø¯Ø¯ Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø´Ù‡Ø± Ù…Ù† Ø¨Ø·Ø§Ù‚Ø© Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©ØŒ ÙˆØ²ÙŠØ¯ Ø£Ù‡Ø¯Ø§Ù Ø§Ù„ØªÙˆÙÙŠØ± ÙˆØªØ¨Ø¹ Ø§Ù„ØªÙ‚Ø¯Ù… Ø¯ÙŠØ§Ù„Ùƒ.",
                    helpNavigation: "Ø¨Ø¯Ù„ Ø§Ù„Ø´Ù‡Ø± Ù…Ù† Ø§Ù„Ø³Ù‡Ù…ÙŠÙ†ØŒ ÙˆØ´ÙˆÙ Ø§Ù„Ø¥Ø­ØµØ§Ø¦ÙŠØ§Øª ÙˆØ§Ù„Ø¹Ù…Ù„ÙŠØ§Øª ÙˆØ§Ù„Ø£Ù‡Ø¯Ø§Ù Ù…Ù† Ø£Ù‚Ø³Ø§Ù… Ø§Ù„ØµÙØ­Ø© Ø£Ùˆ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ù„ØªØ­Øª.",
                    helpSettings: "Ù…Ù† Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø¨Ø¯Ù„ Ø§Ù„Ù„ØºØ© ÙˆØ§Ù„Ø¹Ù…Ù„Ø© ÙˆØ§Ù„Ù…Ø¸Ù‡Ø±. ØªÙ‚Ø¯Ø± ØªØ³ØªØ¹Ù…Ù„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¨Ù„Ø§ Ø­Ø³Ø§Ø¨ØŒ Ø£Ùˆ ØªØ³Ø¬Ù„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù„Ù…Ø²Ø§Ù…Ù†Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø¨ÙŠÙ† Ø§Ù„Ø£Ø¬Ù‡Ø²Ø©.",
                    socialChallengesTitle: "ØªØ­Ø¯ÙŠØ§Øª Ù…Ø¹ ØµØ­Ø§Ø¨Ùƒ", socialChallengesDescription: "Ø¯ÙŠØ±Ùˆ ØªØ­Ø¯ÙŠ ØªÙˆÙÙŠØ± ÙˆØªØ¨Ø¹Ùˆ Ø§Ù„ØªÙ‚Ø¯Ù… Ø¯ÙŠØ§Ù„ÙƒÙ… Ù…Ø¬Ù…ÙˆØ¹ÙŠÙ†.",
                    createChallenge: "ØµØ§ÙŠØ¨ ØªØ­Ø¯ÙŠ", joinChallenge: "Ø¯Ø®Ù„ Ø¨ØªØ­Ø¯ÙŠ", challengeEmpty: "Ø³Ø¬Ù‘Ù„ Ø§Ù„Ø¯Ø®ÙˆÙ„ ÙˆØµØ§ÙŠØ¨ ØªØ­Ø¯ÙŠ Ø£Ùˆ Ø¯Ø®Ù„ Ø¨Ø§Ù„ÙƒÙˆØ¯ Ø§Ù„Ù„ÙŠ Ø´Ø§Ø±ÙƒÙˆ Ù…Ø¹Ø§Ùƒ ØµØ§Ø­Ø¨Ùƒ.",
                    challengeEmptySignedIn: "Ù…Ø§ Ø¹Ù†Ø¯Ùƒ Ø­ØªÙ‰ ØªØ­Ø¯ÙŠ Ø¯Ø§Ø¨Ø§. ØµØ§ÙŠØ¨ ØªØ­Ø¯ÙŠ Ø£Ùˆ Ø¯Ø®Ù„ Ø¨ÙƒÙˆØ¯ ØµØ§Ø­Ø¨Ùƒ.", challengeYou: "(Ù†ØªØ§)",
                    challengeCreateTitle: "ØµØ§ÙŠØ¨ ØªØ­Ø¯ÙŠ ØªÙˆÙÙŠØ±", challengeTitle: "Ø§Ø³Ù… Ø§Ù„ØªØ­Ø¯ÙŠ", challengeTitlePlaceholder: "Ù…Ø«Ø§Ù„: Ù†ÙˆÙØ±ÙˆØ§ Ù„Ù„Ø¹Ø·Ù„Ø©",
                    challengeTarget: "Ù‡Ø¯Ù Ø§Ù„ØªÙˆÙÙŠØ±", challengeTargetPlaceholder: "Ù…Ø«Ø§Ù„: 5000", challengeCurrency: "Ø§Ù„Ø¹Ù…Ù„Ø©",
                    challengeDeadline: "Ø¢Ø®Ø± Ø£Ø¬Ù„", challengeDisplayName: "Ø§Ù„Ø§Ø³Ù… Ø§Ù„Ù„ÙŠ ØºØ§Ø¯ÙŠ ÙŠØ¨Ø§Ù† Ù„ØµØ­Ø§Ø¨Ùƒ", challengeDisplayNamePlaceholder: "Ù…Ø«Ø§Ù„: Ø³Ù„Ù…Ù‰",
                    challengeCreateSubmit: "Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„ØªØ­Ø¯ÙŠ", challengeJoinTitle: "Ø¯Ø®Ù„ Ù„ØªØ­Ø¯ÙŠ ØµØ§Ø­Ø¨Ùƒ", challengeCode: "ÙƒÙˆØ¯ Ø§Ù„Ø¯Ø¹ÙˆØ©",
                    challengeCodePlaceholder: "Ù„ØµÙ‚ ÙƒÙˆØ¯ Ø§Ù„Ø¯Ø¹ÙˆØ© Ù‡Ù†Ø§", challengeJoinSubmit: "Ø§Ù†Ø¶Ù… Ù„Ù„ØªØ­Ø¯ÙŠ",
                    challengeUpdate: "Ø­Ø¯Ù‘Ø« Ø§Ù„ØªÙ‚Ø¯Ù…", challengeProgress: "Ø§Ù„Ù…Ø¨Ù„Øº Ø§Ù„Ù„ÙŠ ÙˆÙØ±ØªÙŠ", challengeInvite: "Ù†Ø³Ø® Ø±Ø§Ø¨Ø· Ø§Ù„Ø¯Ø¹ÙˆØ©",
                    challengeParticipants: "Ø§Ù„Ù…Ø´Ø§Ø±ÙƒÙŠÙ†", challengeCreated: "ØªØ®Ù„Ù‚ Ø§Ù„ØªØ­Ø¯ÙŠ. Ø´Ø§Ø±Ùƒ Ø§Ù„Ø±Ø§Ø¨Ø· Ù…Ø¹ ØµØ­Ø§Ø¨Ùƒ!",
                    challengeJoined: "Ø¯Ø®Ù„ØªÙŠ Ù„Ù„ØªØ­Ø¯ÙŠ!", challengeProgressSaved: "ØªØ­Ø¯Ù‘Ø« Ø§Ù„ØªÙ‚Ø¯Ù… Ø¯ÙŠØ§Ù„Ùƒ.",
                    challengeCopied: "ØªÙ†Ø³Ø® Ø±Ø§Ø¨Ø· Ø§Ù„Ø¯Ø¹ÙˆØ©.", challengeCopyFailed: "Ù…Ø§ Ù‚Ø¯Ø±Ù†Ø§Ø´ Ù†Ù†Ø³Ø®Ùˆ Ø§Ù„Ø±Ø§Ø¨Ø·. Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.",
                    challengeLoginRequired: "Ø®Ø§ØµÙƒ ØªØ³Ø¬Ù„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø¨Ø§Ø´ ØªØ´Ø§Ø±Ùƒ ÙØªØ­Ø¯ÙŠØ§Øª Ø§Ù„Ø£ØµØ¯Ù‚Ø§Ø¡.",
                    challengeLoadError: "Ù…Ø§ Ù‚Ø¯Ø±Ù†Ø§Ø´ Ù†Ø­Ù…Ù„Ùˆ ØªØ­Ø¯ÙŠØ§ØªÙƒ. ØªØ£ÙƒØ¯ Ù…Ù† Ø§Ù„Ø§ØªØµØ§Ù„ ÙˆØ­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.",
                    challengeFull: "Ù‡Ø§Ø¯ Ø§Ù„ØªØ­Ø¯ÙŠ ÙˆØµÙ„ Ù„Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰ Ø¯ÙŠØ§Ù„ Ø§Ù„Ù…Ø´Ø§Ø±ÙƒÙŠÙ†.",
                    challengeInvalid: "Ø¯Ø®Ù„ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ØµØ­ÙŠØ­Ø© Ù„Ù„ØªØ­Ø¯ÙŠ.", challengeMissingName: "Ø¯Ø®Ù„ Ø§Ù„Ø§Ø³Ù… Ø§Ù„Ù„ÙŠ ØºØ§Ø¯ÙŠ ÙŠØ¨Ø§Ù† Ù„Ù„Ù…Ø´Ø§Ø±ÙƒÙŠÙ†.",
                    challengeNotFound: "Ù…Ø§ Ù„Ù‚ÙŠÙ†Ø§Ø´ Ù‡Ø§Ø¯ Ø§Ù„ØªØ­Ø¯ÙŠ. ØªØ£ÙƒØ¯ Ù…Ù† Ø±Ø§Ø¨Ø· Ø§Ù„Ø¯Ø¹ÙˆØ©.",
                    language: "Ù„ØºØ© Ø§Ù„ØªØ·Ø¨ÙŠÙ‚", currency: "Ø§Ù„Ø¹Ù…Ù„Ø©", currencyHelp: "ØªØ¨Ø¯ÙŠÙ„ Ø§Ù„Ø¹Ù…Ù„Ø© ÙƒÙŠØ¨Ø¯Ù„ Ø§Ù„Ø±Ù…Ø² ÙÙ‚Ø·ØŒ ÙˆÙ…Ø§ ÙƒÙŠØ­ÙˆÙ‘Ù„Ø´ Ø§Ù„Ù…Ø¨Ø§Ù„Øº Ø§Ù„Ù…Ø³Ø¬Ù„Ø©.",
                    sound: "ØªØ´ØºÙŠÙ„ Ø£ØµÙˆØ§Øª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚", testSound: "Ø¬Ø±Ù‘Ø¨ Ø§Ù„ØµÙˆØª",
                    switchToDarkMode: "Ù„ÙŠÙ„ÙŠ", switchToLightMode: "Ù†Ù‡Ø§Ø±ÙŠ",
                    exportData: "ØªØµØ¯ÙŠØ± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª", importData: "Ø§Ø³ØªÙŠØ±Ø§Ø¯ ÙˆØ¯Ù…Ø¬ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª",
                    dataTransferHelp: "ØµØ¯Ù‘Ø± Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù…Ù† Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ©ØŒ Ø«Ù… Ø§Ø³ØªÙˆØ±Ø¯Ù‡Ø§ ÙˆØ§Ø¯Ù…Ø¬Ù‡Ø§ Ù…Ø¹ Ø­Ø³Ø§Ø¨Ùƒ.",
                    importDataInvalid: "Ù…Ù„Ù Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ØºÙŠØ± ØµØ§Ù„Ø­ Ø£Ùˆ ÙÙŠÙ‡ Ø¨ÙŠØ§Ù†Ø§Øª ØºÙŠØ± Ù…Ø¯Ø¹ÙˆÙ…Ø©.",
                    importDataTooLarge: "Ø­Ø¬Ù… Ù…Ù„Ù Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙƒØ¨ÙŠØ± Ø¨Ø²Ø§Ù.",
                    importDataMerged: "ØªØ¯Ù…Ø¬Ø§Øª Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ø­Ù„ÙŠØ§Ù‹. Ø³Ø¬Ù‘Ù„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø£Ùˆ Ø£Ù†Ø´Ø¦ Ø­Ø³Ø§Ø¨Ø§Ù‹ Ø¨Ø§Ø´ ØªØ²Ø§Ù…Ù†Ù‡Ø§.",
                    languageSaved: "ØªØ­ÙØ¸Ø§Øª Ø§Ù„Ù„ØºØ© Ø¯ÙŠØ§Ù„Ùƒ.", currencySaved: "ØªØ­ÙØ¸Ø§Øª Ø§Ù„Ø¹Ù…Ù„Ø© Ø¯ÙŠØ§Ù„Ùƒ.", soundSaved: "ØªØ­ÙØ¸Ø§Øª Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„ØµÙˆØª.", transactionInvalid: "Ø¯Ø®Ù„ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ØµØ­ÙŠØ­Ø© Ù„Ù„Ø¹Ù…Ù„ÙŠØ©.",
                    transactionSaved: "ØªØ³Ø¬Ù„Ø§Øª Ø§Ù„Ø¹Ù…Ù„ÙŠØ© Ø¨Ù†Ø¬Ø§Ø­.", quickCash: "Ù…ØµØ±ÙˆÙ Ø³Ø±ÙŠØ¹", quickSave: "Ø³Ø¬Ù‘Ù„ Ø§Ù„Ù…ØµØ±ÙˆÙ", quickNotePlaceholder: "Ù…Ù„Ø§Ø­Ø¸Ø© (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)", budgetInvalid: "Ø¯Ø®Ù„ Ù…ÙŠØ²Ø§Ù†ÙŠØ© ØµØ­ÙŠØ­Ø© Ø£ÙƒØ¨Ø± Ù…Ù† ØµÙØ±.", budgetSaved: "ØªØ­ÙØ¸Ø§Øª Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø¯ÙŠØ§Ù„Ùƒ.",
                    storageFailed: "Ù…Ø§ Ù‚Ø¯Ø±Ù†Ø§Ø´ Ù†Ø­ÙØ¸Ùˆ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª. ØªØ£ÙƒØ¯ Ù…Ù† Ù…Ø³Ø§Ø­Ø© Ø§Ù„ØªØ®Ø²ÙŠÙ†.", settingsFailed: "Ù…Ø§ Ù‚Ø¯Ø±Ù†Ø§Ø´ Ù†Ø­ÙØ¸Ùˆ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª.",
                    audioUnsupported: "Ø§Ù„Ù…ØªØµÙØ­ Ø¯ÙŠØ§Ù„Ùƒ Ù…Ø§ ÙƒÙŠØ¯Ø¹Ù…Ø´ Ø§Ù„ØµÙˆØª.", audioFailed: "Ù…Ø§ Ù‚Ø¯Ø±Ù†Ø§Ø´ Ù†Ø´ØºÙ„Ùˆ Ø§Ù„ØµÙˆØª. Ø¬Ø±Ø¨ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.",
                    deleteTransaction: "Ø­Ø°Ù Ø§Ù„Ø¹Ù…Ù„ÙŠØ©: {description}", categoryFood: "Ø§Ù„Ù…Ø§ÙƒÙ„Ø©", categoryHome: "Ø§Ù„Ø¯Ø§Ø±", categoryTransport: "Ø§Ù„Ù†Ù‚Ù„",
                    categoryHealth: "Ø§Ù„ØµØ­Ø©", categoryShopping: "Ø§Ù„ØªØ³ÙˆÙ‚", categoryBills: "Ø§Ù„ÙÙˆØ§ØªÙŠØ±", categoryFun: "Ø§Ù„ØªØ±ÙÙŠÙ‡", categoryOther: "Ø£Ø®Ø±Ù‰"
                },
                fr: {
                    brandCaption: "Votre argent en toute clartÃ©, lâ€™esprit tranquille", introTitle: "Bienvenue sur Flousi", introCaption: "Votre argent en toute clartÃ©, lâ€™esprit tranquille",
                    introStart: "Commencerã€€â™«",
                    loginTitle: "Ravi de vous revoir", loginCaption: "Connectez-vous pour suivre vos finances.", loginEmail: "Adresse e-mail",
                    loginPassword: "Mot de passe", showPassword: "Afficher", hidePassword: "Masquer",
                    loginNotice: "Connectez-vous ou crÃ©ez un compte pour synchroniser vos donnÃ©es avec le serveur Flousi.",
                    loginFeedback: "Connexion au serveur impossible. VÃ©rifiez quâ€™il est dÃ©marrÃ© puis rÃ©essayez.", loginSubmit: "Se connecter",
                    registerTitle: "CrÃ©er un compte Flousi", registerCaption: "CrÃ©ez un compte pour synchroniser vos donnÃ©es entre vos appareils.",
                    registerSubmit: "CrÃ©er le compte", switchToRegister: "CrÃ©er un compte", switchToLogin: "Jâ€™ai dÃ©jÃ  un compte",
                    apiInvalidLogin: "Adresse e-mail ou mot de passe incorrect.", apiEmailExists: "Cette adresse e-mail est dÃ©jÃ  utilisÃ©e.",
                    apiInvalidEmail: "Saisissez une adresse e-mail valide.",
                    apiInvalidData: "Les donnÃ©es sont invalides et nâ€™ont pas Ã©tÃ© enregistrÃ©es.", apiUnavailable: "Serveur inaccessible. Vos donnÃ©es locales sont conservÃ©es.",
                    apiGenericError: "Une erreur est survenue lors de la connexion au serveur. RÃ©essayez.",
                    accountCreated: "Compte crÃ©Ã© et synchronisation activÃ©e.", accountSignedIn: "Connexion rÃ©ussie et donnÃ©es actualisÃ©es.",
                    signedOut: "Vous Ãªtes dÃ©connectÃ©. Vos donnÃ©es restent enregistrÃ©es sur cet appareil.",
                    accountStatusGuest: "Vous utilisez Flousi sans compte.", accountEmail: "Compte : {email}", connectAccount: "Connexion et synchronisation",
                    signOut: "Se dÃ©connecter", passwordTooShort: "Le mot de passe doit comporter au moins 10 caractÃ¨res.",
                    syncFailed: "Impossible dâ€™enregistrer les modifications du compte. Elles restent sur cet appareil ; vÃ©rifiez le serveur et rÃ©essayez.",
                    continueAsGuest: "Continuer sans compte", backToWelcome: "Retour Ã  lâ€™accueil",
                    settings: "âš™ ParamÃ¨tres", addTransaction: "Ajouter une opÃ©ration", welcome: "Bonjour ! Voici un aperÃ§u de vos finances",
                    navHome: "Accueil", navTransactions: "OpÃ©rations", navTrends: "Tendances", navGoals: "Objectifs", mainNavigation: "Navigation principale",
                    mobileWelcome: "Bonjour",
                    monthSelector: "Choisir le mois", transactionType: "Type dâ€™opÃ©ration", budgetProgress: "Pourcentage du budget utilisÃ©",
                    trendTitle: "Statistiques", categoryChartTitle: "DÃ©penses par catÃ©gorie", comparisonTitle: "Revenus et dÃ©penses",
                    trendSubtitle: "6 derniers mois", trendIncome: "Revenus", trendExpenses: "DÃ©penses", trendPeriod: "PÃ©riode",
                    trendWeek: "Semaine", trendMonth: "Mois", trendYear: "AnnÃ©e", trendWeekRange: "7 derniers jours",
                    trendMonthRange: "6 derniers mois", trendYearRange: "Cette annÃ©e", categoryChartEmpty: "Ajoutez des dÃ©penses pour voir leur rÃ©partition par catÃ©gorie.",
                    trendIncomeAria: "Revenus", trendExpensesAria: "DÃ©penses",
                    savingsImproved: "Votre solde net a augmentÃ© de {amount} par rapport Ã  la pÃ©riode prÃ©cÃ©dente.",
                    savingsReduced: "Votre solde net a diminuÃ© de {amount} par rapport Ã  la pÃ©riode prÃ©cÃ©dente.",
                    savingsSame: "Votre solde net est stable par rapport Ã  la pÃ©riode prÃ©cÃ©dente.",
                    notificationsTitle: "Notifications", notificationsEmpty: "Aucune notification pour le moment.",
                    notificationsButton: "Notifications", markNotificationsRead: "Tout marquer comme lu", clearNotifications: "Tout effacer",
                    notificationSaveError: "Impossible dâ€™enregistrer les notifications.",
                    budgetNotificationTitle: "Alerte budget", savingsNotificationTitle: "Alerte Ã©pargne",
                    notificationContribution: "{amount} ajoutÃ© Ã  lâ€™objectif Â« {goal} Â».", notificationGoalReached: "Lâ€™objectif Â« {goal} Â» est atteint !",
                    savingsTreeTitle: "Mon arbre dâ€™Ã©pargne", savingsTreeCaption: "Chaque Ã©pargne fait grandir votre arbre.",
                    savingsTreeEmpty: "CrÃ©ez un objectif pour planter votre premiÃ¨re graine.", savingsTreeStage0: "Commencez Ã  Ã©pargner pour faire grandir votre arbre.",
                    savingsTreeStage1: "Votre graine commence Ã  pousser !",
                    savingsTreeStage2: "Votre jeune arbre grandit.", savingsTreeStage3: "Chaque Ã©pargne renforce votre arbre.",
                    savingsTreeStage4: "Encore un peu et votre objectif sera atteint !", savingsTreeStage5: "Votre arbre a grandi et votre objectif est atteint !",
                    savingsTreeProgress: "Progression de lâ€™arbre dâ€™Ã©pargne",
                    goalsTitle: "Objectifs dâ€™Ã©pargne", goalsSubtitle: "Suivez votre progression vers vos objectifs", addGoal: "Ajouter un objectif", goalEmpty: "Aucun objectif dâ€™Ã©pargne. CrÃ©ez votre premier objectif !",
                    goalModal: "Nouvel objectif dâ€™Ã©pargne", goalName: "Nom de lâ€™objectif", goalNamePlaceholder: "Ex. : vacances, ordinateur...", goalTarget: "Montant Ã  Ã©pargner",
                    goalTargetPlaceholder: "Ex. : 10000", saveGoal: "Enregistrer lâ€™objectif", contribute: "Ajouter Ã  lâ€™Ã©pargne", contributionAmount: "Montant Ã©pargnÃ©",
                    saveContribution: "Enregistrer lâ€™Ã©pargne", addContribution: "Ajouter une Ã©pargne", deleteGoal: "Supprimer lâ€™objectif", goalCompleted: "Objectif atteint !", goalProgress: "Progression",
                    goalInvalid: "Saisissez un nom et un montant valides.", goalSaved: "Objectif dâ€™Ã©pargne enregistrÃ©.", goalDeleted: "Objectif supprimÃ©.",
                    contributionInvalid: "Saisissez un montant valide.", contributionTooHigh: "Le montant dÃ©passe la somme restante pour atteindre lâ€™objectif.",
                    contributionSaved: "Ã‰pargne enregistrÃ©e.", budgetWarning: "Attention : vous avez atteint 80 % de votre budget mensuel.",
                    budgetExceededAlert: "Attention : votre budget mensuel est atteint ou dÃ©passÃ© !",
                    moneyTipTitle: "Conseil pour vous", moneyTipStart: "Ajoutez vos opÃ©rations pour recevoir un conseil adaptÃ© Ã  vos dÃ©penses.",
                    moneyTipOverBudget: "Votre budget mensuel est dÃ©passÃ©. VÃ©rifiez vos prochaines dÃ©penses et reportez celles qui ne sont pas indispensables.",
                    moneyTipNearBudget: "Vous avez utilisÃ© {percent} % de votre budget. Surveillez les dÃ©penses du reste du mois.",
                    moneyTipBalance: "Vos dÃ©penses dÃ©passent les revenus enregistrÃ©s. VÃ©rifiez vos opÃ©rations pour repÃ©rer les Ã©conomies possibles.",
                    moneyTipSetBudget: "Vous nâ€™avez pas encore dÃ©fini de budget mensuel. Fixez-en un pour mieux suivre vos dÃ©penses.",
                    moneyTipCategory: "La catÃ©gorie la plus dÃ©pensiÃ¨re est Â« {category} Â» avec {percent} % de vos dÃ©penses. Voyez si vous pouvez la rÃ©duire.",
                    moneyTipSave: "Vos revenus dÃ©passent vos dÃ©penses enregistrÃ©es. Pensez Ã  consacrer une partie de la diffÃ©rence Ã  un objectif dâ€™Ã©pargne.",
                    dailyChallengeTitle: "DÃ©fi Ã©pargne du jour", dailyChallengeCaption: "Essayez de mettre cette somme de cÃ´tÃ© aujourdâ€™hui.",
                    dailyChallengeStreak: "ðŸ”¥ {count} jours dâ€™affilÃ©e", dailyChallengeButton: "DÃ©fi du jour accompli !",
                    dailyChallengeDone: "Bravo ! DÃ©fi du jour accompli. Ã€ demain ! ðŸŽ‰",
                    subtitle: "Suivez vos revenus et dÃ©penses et planifiez votre mois sereinement.", balance: "Solde net", income: "Revenus totaux", expenses: "DÃ©penses totales",
                    budgetTitle: "Budget mensuel des dÃ©penses", budgetDefault: "DÃ©finissez votre budget pour mieux maÃ®triser vos dÃ©penses.",
                    budgetNotSet: "Non dÃ©fini", budgetSet: "DÃ©finir le budget", budgetChange: "Modifier le budget",
                    budgetUsed: "Vous avez utilisÃ© {percent} % de votre budget.", budgetRemaining: "Il vous reste {amount}", budgetOver: "Budget dÃ©passÃ© de {amount}",
                    startBudget: "Commencez par dÃ©finir votre budget mensuel.", transactions: "DerniÃ¨res opÃ©rations", transactionCountOne: "{count} opÃ©ration ce mois-ci", transactionCountMany: "{count} opÃ©rations ce mois-ci",
                    filterLabel: "Filtrer les opÃ©rations", filterAll: "Toutes les opÃ©rations", filterExpenses: "DÃ©penses", filterIncome: "Revenus",
                    categoriesTitle: "OÃ¹ va votre argent ?", categoriesSubtitle: "RÃ©partition par catÃ©gorie", emptyFilter: "Aucune opÃ©ration pour ce filtre.",
                    emptyTransactions: "Aucune opÃ©ration pour le moment. Ajoutez votre premiÃ¨re dÃ©pense ou revenu.", emptyCategories: "Les catÃ©gories apparaÃ®tront aprÃ¨s lâ€™ajout de dÃ©penses.",
                    privacy: "Les donnÃ©es invitÃ© restent sur cet appareil ; un compte les synchronise avec le serveur.", transactionModal: "Ajouter une opÃ©ration", close: "Fermer", expense: "DÃ©pense", incomeType: "Revenu",
                    description: "Description", descriptionPlaceholder: "Ex. : cafÃ©, salaire...", amount: "Montant ({currency})", category: "CatÃ©gorie", date: "Date",
                    saveTransaction: "Enregistrer lâ€™opÃ©ration", budgetModal: "Budget mensuel", budgetCopy: "Saisissez le montant maximal Ã  dÃ©penser ce mois-ci.",
                    budgetInput: "Budget ({currency})", budgetPlaceholder: "Ex. : 3000",
                    settingsTitle: "ParamÃ¨tres de lâ€™application", helpButton: "Aide", helpTitle: "Comment utiliser Flousi",
                    helpIntro: "Commencez par enregistrer vos opÃ©rations, puis suivez votre budget et vos objectifs dâ€™Ã©pargne.",
                    helpTransactions: "Utilisez le bouton + pour ajouter une dÃ©pense ou un revenu, avec sa description, son montant et sa date.",
                    helpBudgetGoals: "DÃ©finissez votre budget du mois dans la carte Budget, puis crÃ©ez des objectifs dâ€™Ã©pargne et suivez leur progression.",
                    helpNavigation: "Changez de mois avec les flÃ¨ches. Consultez les statistiques, les opÃ©rations et les objectifs dans les sections ou le menu du bas.",
                    helpSettings: "Dans les paramÃ¨tres, choisissez la langue, la devise et le thÃ¨me. Utilisez lâ€™application sans compte ou connectez-vous pour synchroniser vos donnÃ©es entre appareils.",
                    socialChallengesTitle: "DÃ©fis entre amis", socialChallengesDescription: "Lancez un dÃ©fi dâ€™Ã©pargne et suivez vos progrÃ¨s ensemble.",
                    createChallenge: "CrÃ©er un dÃ©fi", joinChallenge: "Rejoindre", challengeEmpty: "Connectez-vous pour crÃ©er un dÃ©fi ou rejoindre celui dâ€™un ami avec son code.",
                    challengeEmptySignedIn: "Vous nâ€™avez pas encore de dÃ©fi. CrÃ©ez-en un ou rejoignez celui dâ€™un ami.", challengeYou: "(vous)",
                    challengeCreateTitle: "CrÃ©er un dÃ©fi dâ€™Ã©pargne", challengeTitle: "Nom du dÃ©fi", challengeTitlePlaceholder: "Ex. : Ã©pargne pour les vacances",
                    challengeTarget: "Objectif dâ€™Ã©pargne", challengeTargetPlaceholder: "Ex. : 5000", challengeCurrency: "Devise",
                    challengeDeadline: "Date limite", challengeDisplayName: "Nom visible par vos amis", challengeDisplayNamePlaceholder: "Ex. : Salma",
                    challengeCreateSubmit: "CrÃ©er le dÃ©fi", challengeJoinTitle: "Rejoindre le dÃ©fi dâ€™un ami", challengeCode: "Code dâ€™invitation",
                    challengeCodePlaceholder: "Collez le code dâ€™invitation", challengeJoinSubmit: "Rejoindre le dÃ©fi",
                    challengeUpdate: "Mettre Ã  jour", challengeProgress: "Montant Ã©pargnÃ©", challengeInvite: "Copier le lien dâ€™invitation",
                    challengeParticipants: "Participants", challengeCreated: "DÃ©fi crÃ©Ã©. Partagez le lien avec vos amis !",
                    challengeJoined: "Vous avez rejoint le dÃ©fi !", challengeProgressSaved: "Votre progression a Ã©tÃ© mise Ã  jour.",
                    challengeCopied: "Lien dâ€™invitation copiÃ©.", challengeCopyFailed: "Impossible de copier le lien. RÃ©essayez.",
                    challengeLoginRequired: "Connectez-vous pour participer aux dÃ©fis entre amis.",
                    challengeLoadError: "Impossible de charger vos dÃ©fis. VÃ©rifiez la connexion et rÃ©essayez.",
                    challengeFull: "Ce dÃ©fi a atteint le nombre maximal de participants.",
                    challengeInvalid: "Saisissez des informations de dÃ©fi valides.", challengeMissingName: "Saisissez le nom qui sera visible par les participants.",
                    challengeNotFound: "DÃ©fi introuvable. VÃ©rifiez le lien dâ€™invitation.",
                    language: "Langue de lâ€™application", currency: "Devise",
                    currencyHelp: "Changer la devise modifie uniquement le code affichÃ© ; les montants enregistrÃ©s ne sont pas convertis.",
                    sound: "Activer les sons de lâ€™application", testSound: "Tester le son",
                    switchToDarkMode: "Sombre", switchToLightMode: "Clair",
                    exportData: "Exporter les donnÃ©es", importData: "Importer et fusionner les donnÃ©es",
                    dataTransferHelp: "Exportez les donnÃ©es locales, puis importez-les pour les fusionner avec votre compte.",
                    importDataInvalid: "Le fichier de donnÃ©es est invalide ou contient des donnÃ©es non prises en charge.",
                    importDataTooLarge: "Le fichier de donnÃ©es est trop volumineux.",
                    importDataMerged: "DonnÃ©es fusionnÃ©es localement. Connectez-vous ou crÃ©ez un compte pour les synchroniser.",
                    languageSaved: "Langue enregistrÃ©e.", currencySaved: "Devise enregistrÃ©e.", soundSaved: "PrÃ©fÃ©rences audio enregistrÃ©es.", transactionInvalid: "Saisissez des informations valides pour lâ€™opÃ©ration.",
                    transactionSaved: "OpÃ©ration enregistrÃ©e.", quickCash: "DÃ©pense rapide", quickSave: "Enregistrer la dÃ©pense", quickNotePlaceholder: "Note (facultatif)", budgetInvalid: "Saisissez un budget valide supÃ©rieur Ã  zÃ©ro.", budgetSaved: "Budget enregistrÃ©.",
                    storageFailed: "Impossible dâ€™enregistrer les donnÃ©es. VÃ©rifiez lâ€™espace de stockage.", settingsFailed: "Impossible dâ€™enregistrer les paramÃ¨tres.",
                    audioUnsupported: "Votre navigateur ne prend pas en charge lâ€™audio.", audioFailed: "Impossible de lire le son. RÃ©essayez.",
                    deleteTransaction: "Supprimer lâ€™opÃ©ration : {description}", categoryFood: "Alimentation", categoryHome: "Maison", categoryTransport: "Transport",
                    categoryHealth: "SantÃ©", categoryShopping: "Achats", categoryBills: "Factures", categoryFun: "Loisirs", categoryOther: "Autre"
                },
                en: {
                    brandCaption: "Your money, clear and under control", introTitle: "Welcome to Flousi", introCaption: "Your money, clear and under control",
                    introStart: "Start your experienceã€€â™«",
                    loginTitle: "Welcome back", loginCaption: "Sign in to keep track of your money.", loginEmail: "Email address",
                    loginPassword: "Password", showPassword: "Show", hidePassword: "Hide",
                    loginNotice: "Sign in or create an account to sync your data with the Flousi server.",
                    loginFeedback: "Could not connect to the server. Check that it is running and try again.", loginSubmit: "Sign in",
                    registerTitle: "Create a Flousi account", registerCaption: "Create an account to keep your data synced across devices.",
                    registerSubmit: "Create account", switchToRegister: "Create an account", switchToLogin: "I already have an account",
                    apiInvalidLogin: "The email or password is incorrect.", apiEmailExists: "An account with this email already exists.",
                    apiInvalidEmail: "Enter a valid email address.",
                    apiInvalidData: "The data is invalid and was not saved.", apiUnavailable: "Could not reach the server. Your local data is still saved.",
                    apiGenericError: "Something went wrong while contacting the server. Please try again.",
                    accountCreated: "Account created and sync enabled.", accountSignedIn: "Signed in and account data updated.",
                    signedOut: "You are signed out. Your data is still saved on this device.",
                    accountStatusGuest: "You are using Flousi without an account.", accountEmail: "Account: {email}", connectAccount: "Sign in to sync",
                    signOut: "Sign out", passwordTooShort: "Your password must be at least 10 characters long.",
                    syncFailed: "Could not save account changes. They remain on this device; check the server and try again.",
                    continueAsGuest: "Continue without an account", backToWelcome: "Back to welcome",
                    settings: "âš™ Settings", addTransaction: "Add transaction", welcome: "Hello! Hereâ€™s an overview of your money",
                    navHome: "Home", navTransactions: "Activity", navTrends: "Trends", navGoals: "Goals", mainNavigation: "Main navigation",
                    mobileWelcome: "Welcome",
                    monthSelector: "Choose month", transactionType: "Transaction type", budgetProgress: "Budget used",
                    trendTitle: "Statistics", categoryChartTitle: "Spending by category", comparisonTitle: "Income vs expenses",
                    trendSubtitle: "Last 6 months", trendIncome: "Income", trendExpenses: "Expenses", trendPeriod: "Time period",
                    trendWeek: "Week", trendMonth: "Month", trendYear: "Year", trendWeekRange: "Last 7 days",
                    trendMonthRange: "Last 6 months", trendYearRange: "This year", categoryChartEmpty: "Add expenses to see the category breakdown.",
                    trendIncomeAria: "Income", trendExpensesAria: "Expenses",
                    savingsImproved: "Your net savings increased by {amount} compared with the previous period.",
                    savingsReduced: "Your net savings decreased by {amount} compared with the previous period.",
                    savingsSame: "Your net savings are unchanged from the previous period.",
                    notificationsTitle: "Notifications", notificationsEmpty: "Youâ€™re all caught up.",
                    notificationsButton: "Notifications", markNotificationsRead: "Mark all as read", clearNotifications: "Clear all",
                    notificationSaveError: "Could not save notifications.",
                    budgetNotificationTitle: "Budget alert", savingsNotificationTitle: "Savings update",
                    notificationContribution: "{amount} added to â€œ{goal}â€.", notificationGoalReached: "You reached your â€œ{goal}â€ savings goal!",
                    savingsTreeTitle: "My savings tree", savingsTreeCaption: "Every contribution helps your tree grow.",
                    savingsTreeEmpty: "Create a savings goal to plant your first seed.", savingsTreeStage0: "Start saving to help your tree grow.",
                    savingsTreeStage1: "Your seed is starting to grow!",
                    savingsTreeStage2: "Your sapling is growing.", savingsTreeStage3: "Every contribution makes your tree stronger.",
                    savingsTreeStage4: "Just a little more to reach your goal!", savingsTreeStage5: "Your tree has grown and your goal is complete!",
                    savingsTreeProgress: "Savings tree progress",
                    goalsTitle: "Savings goals", goalsSubtitle: "Track your progress toward your goals", addGoal: "Add a goal", goalEmpty: "No savings goals yet. Create your first goal!",
                    goalModal: "New savings goal", goalName: "Goal name", goalNamePlaceholder: "e.g. vacation, laptop...", goalTarget: "Amount to save",
                    goalTargetPlaceholder: "e.g. 10000", saveGoal: "Save goal", contribute: "Add to savings", contributionAmount: "Amount saved",
                    saveContribution: "Save contribution", addContribution: "Add savings", deleteGoal: "Delete goal", goalCompleted: "Goal reached!", goalProgress: "Progress",
                    goalInvalid: "Enter a valid goal name and target amount.", goalSaved: "Savings goal saved.", goalDeleted: "Savings goal deleted.",
                    contributionInvalid: "Enter a valid savings amount.", contributionTooHigh: "That amount is more than the remaining goal balance.",
                    contributionSaved: "Savings contribution saved.", budgetWarning: "Budget alert: youâ€™ve reached 80% of your monthly budget.",
                    budgetExceededAlert: "Budget alert: youâ€™ve reached or exceeded your monthly budget!",
                    moneyTipTitle: "A tip for you", moneyTipStart: "Add transactions to get a tip based on your spending.",
                    moneyTipOverBudget: "Youâ€™re over your monthly budget. Review upcoming expenses and consider postponing non-essentials.",
                    moneyTipNearBudget: "Youâ€™ve used {percent}% of your budget. Keep an eye on spending for the rest of the month.",
                    moneyTipBalance: "Your recorded expenses are higher than your recorded income. Review your transactions to spot possible savings.",
                    moneyTipSetBudget: "You havenâ€™t set a monthly budget yet. Set one to keep track of how much you can spend.",
                    moneyTipCategory: "Your highest-spending category is {category} at {percent}% of your expenses. See if thereâ€™s room to cut back.",
                    moneyTipSave: "Your recorded income is higher than your expenses. Consider putting some of the difference toward a savings goal.",
                    dailyChallengeTitle: "Todayâ€™s savings challenge", dailyChallengeCaption: "Try setting this amount aside today.",
                    dailyChallengeStreak: "ðŸ”¥ {count} days in a row", dailyChallengeButton: "I did todayâ€™s challenge!",
                    dailyChallengeDone: "Nice work! Todayâ€™s challenge is done. See you tomorrow! ðŸŽ‰",
                    subtitle: "Track your income and expenses and plan your month with ease.", balance: "Net balance", income: "Total income", expenses: "Total expenses",
                    budgetTitle: "Monthly spending budget", budgetDefault: "Set a budget to stay in control of your spending.",
                    budgetNotSet: "Not set", budgetSet: "Set budget", budgetChange: "Edit budget",
                    budgetUsed: "Youâ€™ve used {percent}% of your budget.", budgetRemaining: "{amount} remaining", budgetOver: "Over budget by {amount}",
                    startBudget: "Start by setting your monthly budget.", transactions: "Recent transactions", transactionCountOne: "{count} transaction this month", transactionCountMany: "{count} transactions this month",
                    filterLabel: "Filter transactions", filterAll: "All transactions", filterExpenses: "Expenses", filterIncome: "Income",
                    categoriesTitle: "Where does your money go?", categoriesSubtitle: "Spending by category", emptyFilter: "No transactions match this filter.",
                    emptyTransactions: "No transactions yet. Add your first expense or income.", emptyCategories: "Categories will appear when you add expenses.",
                    privacy: "Guest data stays on this device; an account syncs it with the server.", transactionModal: "Add a transaction", close: "Close", expense: "Expense", incomeType: "Income",
                    description: "Description", descriptionPlaceholder: "e.g. coffee, salary...", amount: "Amount ({currency})", category: "Category", date: "Date",
                    saveTransaction: "Save transaction", budgetModal: "Monthly budget", budgetCopy: "Enter the maximum amount you want to spend this month.",
                    budgetInput: "Budget ({currency})", budgetPlaceholder: "e.g. 3000",
                    settingsTitle: "App settings", helpButton: "Help", helpTitle: "How to use Flousi",
                    helpIntro: "Start by recording your transactions, then keep track of your budget and savings goals.",
                    helpTransactions: "Use the + button to add an expense or income, including its description, amount, and date.",
                    helpBudgetGoals: "Set your monthly budget in the Budget card, then create savings goals and track your progress.",
                    helpNavigation: "Change months with the arrows. View trends, transactions, and goals in the page sections or bottom navigation.",
                    helpSettings: "In Settings, choose your language, currency, and theme. Use the app without an account or sign in to sync your data across devices.",
                    socialChallengesTitle: "Challenges with friends", socialChallengesDescription: "Set a savings challenge and track progress together.",
                    createChallenge: "Create challenge", joinChallenge: "Join challenge", challengeEmpty: "Sign in to create a challenge or join a friend with their invite code.",
                    challengeEmptySignedIn: "You donâ€™t have any challenges yet. Create one or join a friendâ€™s.", challengeYou: "(you)",
                    challengeCreateTitle: "Create a savings challenge", challengeTitle: "Challenge name", challengeTitlePlaceholder: "e.g. Save for a trip",
                    challengeTarget: "Savings target", challengeTargetPlaceholder: "e.g. 5000", challengeCurrency: "Currency",
                    challengeDeadline: "Deadline", challengeDisplayName: "Name your friends will see", challengeDisplayNamePlaceholder: "e.g. Sam",
                    challengeCreateSubmit: "Create challenge", challengeJoinTitle: "Join a friendâ€™s challenge", challengeCode: "Invite code",
                    challengeCodePlaceholder: "Paste the invite code", challengeJoinSubmit: "Join challenge",
                    challengeUpdate: "Update progress", challengeProgress: "Amount saved", challengeInvite: "Copy invite link",
                    challengeParticipants: "Participants", challengeCreated: "Challenge created. Share the link with your friends!",
                    challengeJoined: "You joined the challenge!", challengeProgressSaved: "Your progress has been updated.",
                    challengeCopied: "Invite link copied.", challengeCopyFailed: "Could not copy the link. Please try again.",
                    challengeLoginRequired: "Sign in to take part in challenges with friends.",
                    challengeLoadError: "Could not load your challenges. Check your connection and try again.",
                    challengeFull: "This challenge has reached its participant limit.",
                    challengeInvalid: "Enter valid challenge details.", challengeMissingName: "Enter the name other participants will see.",
                    challengeNotFound: "Challenge not found. Check the invitation link.",
                    language: "App language", currency: "Currency",
                    currencyHelp: "Changing the currency updates the displayed code only; saved amounts are not converted.",
                    sound: "Enable app sounds", testSound: "Test sound",
                    switchToDarkMode: "Dark", switchToLightMode: "Light",
                    exportData: "Export data", importData: "Import and merge data",
                    dataTransferHelp: "Export your local data, then import it to merge it with your account.",
                    importDataInvalid: "The data file is invalid or contains unsupported data.",
                    importDataTooLarge: "The data file is too large.",
                    importDataMerged: "Data merged locally. Sign in or create an account to sync it.",
                    languageSaved: "Language saved.", currencySaved: "Currency saved.", soundSaved: "Sound preferences saved.", transactionInvalid: "Enter valid transaction details.",
                    transactionSaved: "Transaction saved.", quickCash: "Quick spend", quickSave: "Save expense", quickNotePlaceholder: "Note (optional)", budgetInvalid: "Enter a valid budget greater than zero.", budgetSaved: "Budget saved.",
                    storageFailed: "Could not save your data. Check available storage.", settingsFailed: "Could not save settings.",
                    audioUnsupported: "Your browser does not support audio.", audioFailed: "Could not play the sound. Please try again.",
                    deleteTransaction: "Delete transaction: {description}", categoryFood: "Food", categoryHome: "Home", categoryTransport: "Transport",
                    categoryHealth: "Health", categoryShopping: "Shopping", categoryBills: "Bills", categoryFun: "Entertainment", categoryOther: "Other"
                }
            };
            const categoryKeys = {
                "Ø§Ù„Ù…Ø§ÙƒÙ„Ø©": "categoryFood", "Ø§Ù„Ø¯Ø§Ø±": "categoryHome", "Ø§Ù„Ù†Ù‚Ù„": "categoryTransport", "Ø§Ù„ØµØ­Ø©": "categoryHealth",
                "Ø§Ù„ØªØ³ÙˆÙ‚": "categoryShopping", "Ø§Ù„ÙÙˆØ§ØªÙŠØ±": "categoryBills", "Ø§Ù„ØªØ±ÙÙŠÙ‡": "categoryFun", "Ø£Ø®Ø±Ù‰": "categoryOther", "Ø§Ù„Ø¯Ø®Ù„": "incomeType"
            };
            const categories = {
                "Ø§Ù„Ù…Ø§ÙƒÙ„Ø©": "ðŸ²", "Ø§Ù„Ø¯Ø§Ø±": "ðŸ ", "Ø§Ù„Ù†Ù‚Ù„": "ðŸš•", "Ø§Ù„ØµØ­Ø©": "ðŸ’Š",
                "Ø§Ù„ØªØ³ÙˆÙ‚": "ðŸ›ï¸", "Ø§Ù„ÙÙˆØ§ØªÙŠØ±": "ðŸ’¡", "Ø§Ù„ØªØ±ÙÙŠÙ‡": "ðŸŽŸï¸", "Ø£Ø®Ø±Ù‰": "ðŸ“¦",
                "Ø§Ù„Ø¯Ø®Ù„": "ðŸ’µ"
            };
            let settings = loadSettings();
            let language = settings.language;
            let formatter = new Intl.NumberFormat(language === "ar" ? "ar-MA" : language === "fr" ? "fr-MA" : "en-US", { maximumFractionDigits: 2 });
            let monthFormatter = new Intl.DateTimeFormat(language === "ar" ? "ar-MA" : language === "fr" ? "fr-MA" : "en-US", { month: "long", year: "numeric" });
            const today = new Date();
            let selectedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            let filterType = "all";
            let trendPeriod = "month";
            let data = loadData();
            let authToken = localStorage.getItem(AUTH_KEY) || "";
            let accountEmail = localStorage.getItem(ACCOUNT_EMAIL_KEY) || "";
            let notifications = loadNotifications();
            let socialChallenges = [];
            let pendingInviteId = new URLSearchParams(window.location.search).get("challenge");
            if (!/^[A-Za-z0-9_-]{16}$/.test(pendingInviteId || "")) pendingInviteId = "";
            let invitePrompted = false;
            let accountMode = "login";
            let syncRevision = 0;
            let syncedRevision = 0;
            let syncTimer;
            let syncTask = null;
            let introTransitionTimer;
            let audioContext;

            function loadSettings() {
                try {
                    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
                    return {
                        language: ["ar", "fr", "en"].includes(saved.language) ? saved.language : "ar",
                        currency: SUPPORTED_CURRENCIES.includes(saved.currency) ? saved.currency : "MAD",
                        darkMode: saved.darkMode === true,
                        sounds: saved.sounds !== false
                    };
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚:", error);
                    return { language: "ar", currency: "MAD", darkMode: false, sounds: true };
                }
            }
function saveSettings() {
                try {
                    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
                    return true;
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± Ø­ÙØ¸ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚:", error);
                    showToast(t("settingsFailed"));
                    return false;
                }
            }

            function t(key, values) {
                let text = translations[language][key] || translations.ar[key] || key;
                if (values) {
                    Object.entries(values).forEach(([name, value]) => {
                        text = text.replace("{" + name + "}", String(value));
                    });
                }
                return text;
            }

            function applyTheme() {
                const darkMode = settings.darkMode;
                document.documentElement.dataset.theme = darkMode ? "dark" : "light";
                document.querySelector('meta[name="theme-color"]').content = darkMode ? "#121b16" : "#f3f7f1";
                const toggle = document.getElementById("toggleTheme");
                const label = t(darkMode ? "switchToLightMode" : "switchToDarkMode");
                document.getElementById("themeToggleIcon").textContent = darkMode ? "â˜€" : "â˜¾";
                document.getElementById("themeToggleLabel").textContent = label;
                toggle.setAttribute("aria-label", label);
                toggle.setAttribute("aria-pressed", String(darkMode));
            }

            function applyLanguage() {
                const locale = language === "ar" ? "ar-MA" : language === "fr" ? "fr-MA" : "en-US";
                document.documentElement.lang = locale;
                document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
                document.title = language === "ar" ? "ÙÙ„ÙˆØ³ÙŠ â€” Ù…Ù†Ø¸Ù‘Ù… Ø§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ©" : language === "fr" ? "Flousi â€” Budget" : "Flousi â€” Budget planner";
                formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
                monthFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
                const textById = {
                    "introTitle": "introTitle", "introCaption": "introCaption", "startExperience": "introStart",
                    "loginBrandCaption": "brandCaption", "loginTitle": "loginTitle", "loginCaption": "loginCaption",
                    "loginEmailLabel": "loginEmail", "loginPasswordLabel": "loginPassword",
                    "loginNotice": "loginNotice", "loginSubmit": "loginSubmit", "toggleAccountMode": "switchToRegister",
                    "continueAsGuest": "continueAsGuest", "backToWelcome": "backToWelcome",
                    "welcomeTitle": "welcome", "welcomeSubtitle": "subtitle", "budgetTitle": "budgetTitle", "transactionsTitle": "transactions",
                    "helpButtonLabel": "helpButton", "helpTitle": "helpTitle", "helpIntro": "helpIntro",
                    "helpTransactions": "helpTransactions", "helpBudgetGoals": "helpBudgetGoals",
                    "helpNavigation": "helpNavigation", "helpSettings": "helpSettings",
                    "notificationsTitle": "notificationsTitle", "notificationsButtonLabel": "notificationsButton",
                    "markNotificationsRead": "markNotificationsRead", "clearNotifications": "clearNotifications",
                    "notificationsEmpty": "notificationsEmpty",
                    "socialChallengesTitle": "socialChallengesTitle", "socialChallengesDescription": "socialChallengesDescription",
                    "joinChallengeButton": "joinChallenge", "createChallengeText": "createChallenge", "socialChallengeEmpty": "challengeEmpty",
                    "createChallengeTitle": "challengeCreateTitle", "challengeTitleLabel": "challengeTitle",
                    "challengeTargetLabel": "challengeTarget", "challengeCurrencyLabel": "challengeCurrency",
                    "challengeDeadlineLabel": "challengeDeadline", "challengeDisplayNameLabel": "challengeDisplayName",
                    "createChallengeSubmit": "challengeCreateSubmit", "joinChallengeTitle": "challengeJoinTitle",
                    "challengeCodeLabel": "challengeCode", "joinDisplayNameLabel": "challengeDisplayName",
                    "joinChallengeSubmit": "challengeJoinSubmit",
                    "navHome": "navHome", "navTransactions": "navTransactions", "navTrends": "navTrends", "navGoals": "navGoals",
                    "mobileWelcome": "mobileWelcome",
                    "moneyTipTitle": "moneyTipTitle",
                    "dailyChallengeTitle": "dailyChallengeTitle", "dailyChallengeCaption": "dailyChallengeCaption",
                    "trendTitle": "trendTitle", "categoryChartTitle": "categoryChartTitle", "comparisonTitle": "comparisonTitle",
                    "trendExpensesLabel": "trendExpenses",
                    "trendIncomeLabel": "trendIncome",
                    "goalsTitle": "goalsTitle", "goalsSubtitle": "goalsSubtitle", "addGoalText": "addGoal", "goalEmpty": "goalEmpty",
                    "savingsTreeTitle": "savingsTreeTitle", "savingsTreeCaption": "savingsTreeCaption",
                    "goalModalTitle": "goalModal", "goalNameLabel": "goalName", "goalTargetLabel": "goalTarget", "goalSubmit": "saveGoal",
                    "contributionTitle": "contribute", "contributionAmountLabel": "contributionAmount", "contributionSubmit": "saveContribution",
                    "categoriesTitle": "categoriesTitle", "categorySubtitle": "categoriesSubtitle", "privacyText": "privacy", "transactionModalTitle": "transactionModal",
                    "descriptionLabel": "description", "amountLabel": "amount", "categoryLabel": "category", "dateLabel": "date",
                    "budgetModalTitle": "budgetModal", "budgetDialogCopy": "budgetCopy", "budgetInputLabel": "budgetInput",
                    "settingsTitle": "settingsTitle", "languageLabel": "language", "currencyLabel": "currency", "soundLabel": "sound", "testSound": "testSound",
                    "exportDataButton": "exportData", "importDataButton": "importData", "dataTransferHelp": "dataTransferHelp",
                    "openTransactionText": "addTransaction", "transactionSubmit": "saveTransaction", "budgetSubmit": "saveBudget",
                    "quickCashTitle": "quickCash", "quickCashSubmit": "quickSave"
                };
                Object.entries(textById).forEach(([id, key]) => {
                    const element = document.getElementById(id);
                    if (element) element.textContent = t(key);
                });
                document.getElementById("amountLabel").textContent = t("amount", { currency: settings.currency });
                document.getElementById("budgetInputLabel").textContent = t("budgetInput", { currency: settings.currency });
                document.getElementById("challengeTitleInput").placeholder = t("challengeTitlePlaceholder");
                document.getElementById("challengeTargetInput").placeholder = t("challengeTargetPlaceholder");
                document.getElementById("challengeDisplayNameInput").placeholder = t("challengeDisplayNamePlaceholder");
                document.getElementById("joinDisplayNameInput").placeholder = t("challengeDisplayNamePlaceholder");
                document.getElementById("challengeCodeInput").placeholder = t("challengeCodePlaceholder");
                document.getElementById("currencyHelp").textContent = t("currencyHelp");
                const loginPassword = document.getElementById("loginPassword");
                const passwordToggle = document.getElementById("togglePassword");
                if (loginPassword && passwordToggle) {
                    const passwordVisibilityKey = loginPassword.type === "password" ? "showPassword" : "hidePassword";
                    passwordToggle.textContent = t(passwordVisibilityKey);
                    passwordToggle.setAttribute("aria-label", t(passwordVisibilityKey));
                }
                const loginFeedback = document.getElementById("loginFeedback");
                if (loginFeedback) loginFeedback.textContent = t("loginFeedback");
                document.querySelector(".brand-caption").textContent = t("brandCaption");
                document.getElementById("settingsButtonLabel").textContent = t("settings");
                document.getElementById("openHelp").setAttribute("aria-label", t("helpButton"));
                document.getElementById("toggleNotifications").setAttribute("aria-label", t("notificationsButton"));
                document.querySelectorAll(".close-button").forEach(button => button.setAttribute("aria-label", t("close")));
                applyTheme();
                document.getElementById("monthSwitcher").setAttribute("aria-label", t("monthSelector"));
                document.querySelector(".mobile-nav").setAttribute("aria-label", t("mainNavigation"));
                document.getElementById("trendPeriodSwitch").setAttribute("aria-label", t("trendPeriod"));
                document.querySelectorAll("#trendPeriodSwitch [data-period]").forEach(button => {
                    button.textContent = t("trend" + button.dataset.period.charAt(0).toUpperCase() + button.dataset.period.slice(1));
                    button.setAttribute("aria-pressed", String(button.dataset.period === trendPeriod));
                    button.classList.toggle("active", button.dataset.period === trendPeriod);
                });
                document.getElementById("transactionTypeSwitch").setAttribute("aria-label", t("transactionType"));
                document.getElementById("budgetProgress").setAttribute("aria-label", t("budgetProgress"));
                document.getElementById("socialChallengeList").setAttribute("aria-label", t("socialChallengesTitle"));
                renderSocialChallenges();
                renderNotifications();
                document.querySelector("[data-summary='balance']").textContent = t("balance");
                document.querySelector("[data-summary='income']").textContent = t("income");
                document.querySelector("[data-summary='expenses']").textContent = t("expenses");
                document.getElementById("editBudget").textContent = t(data.budgets[monthKey(selectedMonth)] ? "budgetChange" : "budgetSet");
                document.getElementById("typeFilter").setAttribute("aria-label", t("filterLabel"));
                document.getElementById("addGoal").setAttribute("aria-label", t("addGoal"));
                document.querySelector("#typeFilter option[value='all']").textContent = t("filterAll");
                document.querySelector("#typeFilter option[value='expense']").textContent = t("filterExpenses");
                document.querySelector("#typeFilter option[value='income']").textContent = t("filterIncome");
                document.querySelectorAll("#category option").forEach(option => {
                    option.textContent = t(categoryKeys[option.value] || "categoryOther");
                });
                document.querySelector("#transactionForm [data-type='expense']").textContent = t("expense");
                document.querySelector("#transactionForm [data-type='income']").textContent = t("incomeType");
                document.querySelector("#description").placeholder = t("descriptionPlaceholder");
                document.getElementById("quickNote").placeholder = t("quickNotePlaceholder");
                document.querySelectorAll("[data-quick-cash-text]").forEach(element => { element.textContent = t("quickCash"); });
                document.querySelector("#budgetInput").placeholder = t("budgetPlaceholder");
                document.querySelector("#goalName").placeholder = t("goalNamePlaceholder");
                document.querySelector("#goalTarget").placeholder = t("goalTargetPlaceholder");
                document.querySelectorAll("[data-close]").forEach(button => button.setAttribute("aria-label", t("close")));
                document.getElementById("previousMonth").setAttribute("aria-label", language === "ar" ? "Ø§Ù„Ø´Ù‡Ø± Ø§Ù„Ø³Ø§Ø¨Ù‚" : language === "fr" ? "Mois prÃ©cÃ©dent" : "Previous month");
                document.getElementById("nextMonth").setAttribute("aria-label", language === "ar" ? "Ø§Ù„Ø´Ù‡Ø± Ø§Ù„ØªØ§Ù„ÙŠ" : language === "fr" ? "Mois suivant" : "Next month");
                document.getElementById("categoryChartEmpty").textContent = t("categoryChartEmpty");
                const intro = document.getElementById("introScreen");
                if (intro) {
                    intro.setAttribute("aria-label", t("introTitle"));
                }
                document.getElementById("soundToggle").checked = settings.sounds;
                document.getElementById("languageSelect").value = language;
                document.getElementById("currencySelect").value = settings.currency;
                document.getElementById("trendChart").setAttribute("aria-label", t("trendTitle") + " â€” " + t("trendSubtitle"));
                updateAccountMode();
                updateAccountSettings();
                render();
            }

            function normalizedData(saved) {
                return {
                    transactions: Array.isArray(saved.transactions) ? saved.transactions.filter(isValidTransaction) : [],
                    budgets: saved.budgets && typeof saved.budgets === "object" && !Array.isArray(saved.budgets) ? saved.budgets : {},
                    goals: Array.isArray(saved.goals) ? saved.goals.filter(isValidGoal) : [],
                    budgetAlerts: Array.isArray(saved.budgetAlerts) ? saved.budgetAlerts.filter(item => typeof item === "string") : [],
                    dailyChallenges: Array.isArray(saved.dailyChallenges)
                        ? [...new Set(saved.dailyChallenges.filter(item => typeof item === "string" && /^\d{4}-\d{2}-\d{2}$/.test(item)))].sort().slice(-365)
                        : []
                };
            }

            function validImportDate(value) {
                if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
                const date = new Date(value + "T00:00:00Z");
                return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
            }

            function validateImportData(value) {
                if (!value || typeof value !== "object" || Array.isArray(value) ||
                    !Array.isArray(value.transactions) || value.transactions.length > 10000 ||
                    !value.budgets || typeof value.budgets !== "object" || Array.isArray(value.budgets) ||
                    !Array.isArray(value.goals) || value.goals.length > 1000 ||
                    !Array.isArray(value.budgetAlerts) || value.budgetAlerts.length > 5000 ||
                    !Array.isArray(value.dailyChallenges) || value.dailyChallenges.length > 365) return null;

                if (!value.transactions.every(item =>
                    item && typeof item === "object" && !Array.isArray(item) &&
                    typeof item.id === "string" && item.id.length >= 1 && item.id.length <= 128 &&
                    (item.type === "income" || item.type === "expense") &&
                    typeof item.description === "string" && item.description.trim() && item.description.length <= 200 &&
                    Number.isFinite(item.amount) && item.amount > 0 && item.amount <= 999999999 &&
                    typeof item.category === "string" && item.category.length <= 50 &&
                    validImportDate(item.date)) ||
                    !value.goals.every(goal =>
                        goal && typeof goal === "object" && !Array.isArray(goal) &&
                        typeof goal.id === "string" && goal.id.length >= 1 && goal.id.length <= 128 &&
                        typeof goal.name === "string" && goal.name.trim() && goal.name.length <= 50 &&
                        Number.isFinite(goal.target) && goal.target > 0 && goal.target <= 999999999 &&
                        Number.isFinite(goal.saved) && goal.saved >= 0 && goal.saved <= goal.target) ||
                    !Object.entries(value.budgets).every(([month, amount]) =>
                        /^\d{4}-(0[1-9]|1[0-2])$/.test(month) &&
                        Number.isFinite(amount) && amount > 0 && amount <= 999999999) ||
                    !value.budgetAlerts.every(item => typeof item === "string" && /^\d{4}-(0[1-9]|1[0-2]):(80|100)$/.test(item)) ||
                    !value.dailyChallenges.every(validImportDate)) return null;

                return {
                    transactions: value.transactions,
                    budgets: value.budgets,
                    goals: value.goals,
                    budgetAlerts: value.budgetAlerts,
                    dailyChallenges: value.dailyChallenges
                };
            }

            function mergeData(current, incoming) {
                const transactions = new Map(current.transactions.map(item => [item.id, item]));
                incoming.transactions.forEach(item => transactions.set(item.id, item));
                const goals = new Map(current.goals.map(goal => [goal.id, goal]));
                incoming.goals.forEach(goal => goals.set(goal.id, goal));
                const merged = {
                    transactions: [...transactions.values()],
                    budgets: { ...current.budgets, ...incoming.budgets },
                    goals: [...goals.values()],
                    budgetAlerts: [...new Set([...current.budgetAlerts, ...incoming.budgetAlerts])],
                    dailyChallenges: [...new Set([...current.dailyChallenges, ...incoming.dailyChallenges])].sort().slice(-365)
                };
                return validateImportData(merged);
            }

            function loadData() {
                try {
                    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
                    return normalizedData(saved);
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø­ÙÙˆØ¸Ø©:", error);
                    return { transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] };
                }
            }

            function isValidTransaction(item) {
                return item && typeof item.id === "string" &&
                    (item.type === "income" || item.type === "expense") &&
                    typeof item.description === "string" && item.description.trim() &&
                    Number.isFinite(item.amount) && item.amount > 0 &&
                    typeof item.category === "string" && /^\d{4}-\d{2}-\d{2}$/.test(item.date);
            }

            function isValidGoal(goal) {
                return goal && typeof goal.id === "string" &&
                    typeof goal.name === "string" && goal.name.trim() &&
                    Number.isFinite(goal.target) && goal.target > 0 &&
                    Number.isFinite(goal.saved) && goal.saved >= 0 && goal.saved <= goal.target;
            }

            function saveData(sync = true) {
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                    if (sync && authToken) queueRemoteSync();
                    return true;
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± Ø­ÙØ¸ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª:", error);
                    showToast(t("storageFailed"));
                    return false;
                }
            }

            function updateAccountMode() {
                const registering = accountMode === "register";
                document.getElementById("loginTitle").textContent = t(registering ? "registerTitle" : "loginTitle");
                document.getElementById("loginCaption").textContent = t(registering ? "registerCaption" : "loginCaption");
                document.getElementById("loginSubmit").textContent = t(registering ? "registerSubmit" : "loginSubmit");
                document.getElementById("toggleAccountMode").textContent = t(registering ? "switchToLogin" : "switchToRegister");
                document.getElementById("loginPassword").autocomplete = registering ? "new-password" : "current-password";
            }

            function updateAccountSettings() {
                document.getElementById("accountStatus").textContent = authToken
                    ? t("accountEmail", { email: accountEmail })
                    : t("accountStatusGuest");
                document.getElementById("manageAccount").textContent = t(authToken ? "signOut" : "connectAccount");
            }

            function showLoginScreen() {
                clearTimeout(introTransitionTimer);
                const intro = document.getElementById("introScreen");
                intro.hidden = false;
                intro.classList.remove("is-leaving");
                document.getElementById("welcomePanel").hidden = true;
                document.getElementById("loginForm").hidden = false;
                document.getElementById("loginFeedback").hidden = true;
                accountMode = "login";
                updateAccountMode();
                document.getElementById("loginEmail").value = accountEmail;
                document.getElementById("loginEmail").focus();
            }

            async function submitAccountForm(event) {
                event.preventDefault();
                const email = document.getElementById("loginEmail").value.trim();
                const password = document.getElementById("loginPassword").value;
                const feedback = document.getElementById("loginFeedback");
                const submit = document.getElementById("loginSubmit");
                const registering = accountMode === "register";
                if (registering && password.length < 10) {
                    feedback.textContent = t("passwordTooShort");
                    feedback.hidden = false;
                    return;
                }

                submit.disabled = true;
                feedback.textContent = t("loginFeedback");
                feedback.hidden = false;
                try {
                    const requestBody = { email, password };
                    if (registering) requestBody.data = data;
                    const result = await apiRequest(
                        registering ? "/api/auth/register" : "/api/auth/login",
                        { method: "POST", body: JSON.stringify(requestBody) }
                    );
                    try {
                        localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(data));
                        localStorage.setItem(AUTH_KEY, result.token);
                        localStorage.setItem(ACCOUNT_EMAIL_KEY, result.email);
                        localStorage.setItem(SYNCED_DATA_KEY, JSON.stringify(result.data));
                    } catch (error) {
                        console.error("ØªØ¹Ø°Ø± Ø­ÙØ¸ Ø¬Ù„Ø³Ø© Ø§Ù„Ø­Ø³Ø§Ø¨:", error);
                        feedback.textContent = t("storageFailed");
                        return;
                    }
                    authToken = result.token;
                    accountEmail = result.email;
                    notifications = loadNotifications();
                    renderNotifications();
                    data = normalizedData(result.data);
                    syncedRevision = syncRevision;
                    saveData(false);
                    updateAccountSettings();
                    feedback.hidden = true;
                    document.getElementById("loginPassword").value = "";
                    finishIntro();
                    loadSocialChallenges();
                    showToast(t(registering ? "accountCreated" : "accountSignedIn"));
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø¥Ù„Ù‰ Flousi:", error);
                    feedback.textContent = error.status ? error.message : t("apiUnavailable");
                    feedback.hidden = false;
                } finally {
                    submit.disabled = false;
                }
            }

            async function restoreStoredAccount() {
                if (!authToken) return;
                document.getElementById("startExperience").disabled = true;
                document.getElementById("continueAsGuest").disabled = true;
                try {
                    const result = await apiRequest("/api/data");
                    const cachedData = data;
                    const serverData = normalizedData(result.data);
                    const lastSynced = localStorage.getItem(SYNCED_DATA_KEY);
                    let hasPendingChanges = false;
                    if (lastSynced !== null) {
                        try {
                            hasPendingChanges = JSON.stringify(cachedData) !==
                                JSON.stringify(normalizedData(JSON.parse(lastSynced)));
                        } catch (error) {
                            console.error("ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ù†Ø³Ø®Ø© Ø§Ù„Ù…Ø²Ø§Ù…Ù†Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ©:", error);
                            hasPendingChanges = true;
                        }
                    }
                    accountEmail = result.email || accountEmail;
                    notifications = loadNotifications();
                    renderNotifications();
                    localStorage.setItem(ACCOUNT_EMAIL_KEY, accountEmail);
                    localStorage.setItem(SYNCED_DATA_KEY, JSON.stringify(serverData));
                    data = hasPendingChanges ? cachedData : serverData;
                    if (hasPendingChanges) {
                        queueRemoteSync();
                    } else {
                        syncedRevision = syncRevision;
                    }
                    saveData(false);
                    updateAccountSettings();
                    finishIntro();
                    loadSocialChallenges();
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø­Ø³Ø§Ø¨ Flousi:", error);
                    if (error.status === 401) {
                        authToken = "";
                        accountEmail = "";
                        notifications = loadNotifications();
                        renderNotifications();
                        socialChallenges = [];
                        renderSocialChallenges();
                        localStorage.removeItem(AUTH_KEY);
                        localStorage.removeItem(ACCOUNT_EMAIL_KEY);
                        localStorage.removeItem(SYNCED_DATA_KEY);
                        restoreGuestData();
                    } else {
                        updateAccountSettings();
                        finishIntro();
                        showToast(t("apiUnavailable"));
                    }
                } finally {
                    document.getElementById("startExperience").disabled = false;
                    document.getElementById("continueAsGuest").disabled = false;
                }
            }

            function restoreGuestData() {
                try {
                    const savedGuestData = localStorage.getItem(GUEST_DATA_KEY);
                    data = savedGuestData ? normalizedData(JSON.parse(savedGuestData)) : {
                        transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: []
                    };
                    localStorage.removeItem(GUEST_DATA_KEY);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¶ÙŠÙ:", error);
                    data = { transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] };
                    showToast(t("storageFailed"));
                }
                updateAccountSettings();
                render();
            }

            async function signOutAccount() {
                if (syncRevision > syncedRevision && !await syncRemoteData()) return;
                try {
                    localStorage.removeItem(AUTH_KEY);
                    localStorage.removeItem(ACCOUNT_EMAIL_KEY);
                    localStorage.removeItem(SYNCED_DATA_KEY);
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± Ø¥Ù†Ù‡Ø§Ø¡ Ø¬Ù„Ø³Ø© Ø§Ù„Ø­Ø³Ø§Ø¨:", error);
                    showToast(t("storageFailed"));
                    return;
                }
                authToken = "";
                accountEmail = "";
                notifications = loadNotifications();
                renderNotifications();
                closeModal("settingsModal");
                restoreGuestData();
                showToast(t("signedOut"));
            }

            async function apiRequest(endpoint, options = {}) {
                const headers = new Headers(options.headers || {});
                if (authToken) headers.set("Authorization", "Bearer " + authToken);
                if (options.body !== undefined) headers.set("Content-Type", "application/json");
                const response = await fetch(API_BASE_URL + endpoint, { ...options, headers });
                let body;
                try {
                    body = await response.json();
                } catch {
                    throw new Error(t("apiGenericError"));
                }
                if (!response.ok) {
                    const messageKey = {
                        INVALID_LOGIN: "apiInvalidLogin",
                        INVALID_EMAIL: "apiInvalidEmail",
                        INVALID_PASSWORD: "passwordTooShort",
                        EMAIL_EXISTS: "apiEmailExists",
                        INVALID_DATA: "apiInvalidData",
                        INVALID_CHALLENGE: "challengeInvalid",
                        CHALLENGE_FULL: "challengeFull",
                        NOT_FOUND: "challengeNotFound"
                    }[body.code];
                    const error = new Error(messageKey ? t(messageKey) : t("apiGenericError"));
                    error.status = response.status;
                    throw error;
                }
                return body;
            }

            async function loadSocialChallenges() {
                if (!authToken) {
                    socialChallenges = [];
                    renderSocialChallenges();
                    return;
                }
                try {
                    const result = await apiRequest("/api/challenges");
                    socialChallenges = result.challenges;
                    renderSocialChallenges();
                    promptPendingChallenge();
                } catch (error) {
                    console.error("Could not load Flousi friend challenges:", error);
                    showToast(t("challengeLoadError"));
                }
            }

            function promptPendingChallenge() {
                if (!pendingInviteId || invitePrompted) return;
                invitePrompted = true;
                document.getElementById("challengeCodeInput").value = pendingInviteId;
                openModal("joinChallengeModal");
                document.getElementById("joinDisplayNameInput").focus();
            }

            function clearPendingChallengeInvite() {
                if (!pendingInviteId) return;
                pendingInviteId = "";
                const url = new URL(window.location.href);
                url.searchParams.delete("challenge");
                window.history.replaceState(null, "", url);
            }

            function requireChallengeAccount() {
                if (authToken) return true;
                showLoginScreen();
                const feedback = document.getElementById("loginFeedback");
                feedback.textContent = t("challengeLoginRequired");
                feedback.hidden = false;
                return false;
            }

            function replaceSocialChallenge(challenge) {
                const index = socialChallenges.findIndex(item => item.id === challenge.id);
                if (index === -1) socialChallenges.push(challenge);
                else socialChallenges[index] = challenge;
                renderSocialChallenges();
            }

            async function copyChallengeInvite(id) {
                const inviteUrl = new URL(window.location.href);
                inviteUrl.searchParams.set("challenge", id);
                let copiedToClipboard = false;
                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(inviteUrl.href);
                        copiedToClipboard = true;
                    }
                } catch (error) {
                    console.error("Could not copy the challenge invitation to the clipboard:", error);
                }
                if (!copiedToClipboard && window.prompt(t("challengeInvite"), inviteUrl.href) === null) {
                    showToast(t("challengeCopyFailed"));
                    return;
                }
                showToast(t("challengeCopied"));
            }

            function queueRemoteSync() {
                syncRevision++;
                clearTimeout(syncTimer);
                syncTimer = setTimeout(() => {
                    syncRemoteData();
                }, 500);
            }

            async function syncRemoteData() {
                if (!authToken) return true;
                if (syncTask) {
                    const completed = await syncTask;
                    if (!completed) return false;
                    return syncRevision > syncedRevision ? syncRemoteData() : true;
                }
                clearTimeout(syncTimer);
                const token = authToken;
                const revision = syncRevision;
                const snapshot = JSON.stringify(data);
                const task = (async () => {
                    try {
                        await apiRequest("/api/data", { method: "PUT", body: snapshot });
                        try {
                            localStorage.setItem(SYNCED_DATA_KEY, snapshot);
                        } catch (error) {
                            console.error("ØªØ¹Ø°Ø± Ø­ÙØ¸ Ù†Ø³Ø®Ø© Ø§Ù„Ù…Ø²Ø§Ù…Ù†Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ©:", error);
                            showToast(t("storageFailed"));
                        }
                        syncedRevision = revision;
                        return true;
                    } catch (error) {
                        console.error("ØªØ¹Ø°Ø±Øª Ù…Ø²Ø§Ù…Ù†Ø© Ø¨ÙŠØ§Ù†Ø§Øª Flousi:", error);
                        showToast(t("syncFailed"));
                        return false;
                    }
                })();
                syncTask = task;
                const completed = await task;
                if (syncTask === task) syncTask = null;
                if (!completed) return false;
                if (authToken === token && syncRevision > syncedRevision) return syncRemoteData();
                return true;
            }

            function monthKey(date) {
                return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
            }

            function formatMoney(amount) {
                const unit = language === "ar" ? "Ø¯.Ù…." : "MAD";
                return formatter.format(amount) + " " + unit;
            }

            function currencyUnit() {
                return settings.currency === "MAD" && language === "ar" ? "Ø¯.Ù…." : settings.currency;
            }

            function localDateValue(date) {
                return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
            }

            function finishIntro() {
                clearTimeout(introTransitionTimer);
                const intro = document.getElementById("introScreen");
                document.getElementById("appShell").hidden = false;
                intro.classList.add("is-leaving");
                promptPendingChallenge();
                introTransitionTimer = window.setTimeout(() => {
                    intro.hidden = true;
                    intro.classList.remove("is-leaving");
                }, 500);
            }

            function playWelcomeSound() {
                const AudioContextClass = window.AudioContext;
                if (!AudioContextClass) {
                    showToast(t("audioUnsupported"));
                    return;
                }

                try {
                    audioContext = audioContext || new AudioContextClass();
                    audioContext.resume().then(() => {
                        const notes = [523.25, 659.25, 783.99];
                        const start = audioContext.currentTime;
                        notes.forEach((frequency, index) => {
                            const oscillator = audioContext.createOscillator();
                            const volume = audioContext.createGain();
                            const noteStart = start + index * 0.16;
                            oscillator.type = "sine";
                            oscillator.frequency.setValueAtTime(frequency, noteStart);
                            volume.gain.setValueAtTime(0.0001, noteStart);
                            volume.gain.exponentialRampToValueAtTime(0.09, noteStart + 0.04);
                            volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.42);
                            oscillator.connect(volume);
                            volume.connect(audioContext.destination);
                            oscillator.start(noteStart);
                            oscillator.stop(noteStart + 0.44);
                        });
                    }).catch(error => {
                        console.error("ØªØ¹Ø°Ø± ØªØ´ØºÙŠÙ„ Ù†ØºÙ…Ø© Ø§Ù„ØªØ±Ø­ÙŠØ¨:", error);
                        showToast(t("audioFailed"));
                    });
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± ØªØ´ØºÙŠÙ„ Ù†ØºÙ…Ø© Ø§Ù„ØªØ±Ø­ÙŠØ¨:", error);
                    showToast(t("audioFailed"));
                }
            }

            function playUiSound(kind, force) {
                if (!force && !settings.sounds) return;
                const AudioContextClass = window.AudioContext;
                if (!AudioContextClass) {
                    if (force) showToast(t("audioUnsupported"));
                    return;
                }
                const patterns = {
                    success: [659.25, 880],
                    remove: [493.88, 392],
                    open: [523.25, 659.25],
                    close: [659.25, 523.25],
                    navigate: [587.33],
                    test: [523.25, 659.25, 783.99]
                };
                const notes = patterns[kind] || patterns.open;
                try {
                    audioContext = audioContext || new AudioContextClass();
                    audioContext.resume().then(() => {
                        const start = audioContext.currentTime;
                        notes.forEach((frequency, index) => {
                            const oscillator = audioContext.createOscillator();
                            const volume = audioContext.createGain();
                            const noteStart = start + index * 0.12;
                            oscillator.type = "sine";
                            oscillator.frequency.setValueAtTime(frequency, noteStart);
                            volume.gain.setValueAtTime(0.0001, noteStart);
                            volume.gain.exponentialRampToValueAtTime(0.045, noteStart + 0.025);
                            volume.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.22);
                            oscillator.connect(volume);
                            volume.connect(audioContext.destination);
                            oscillator.start(noteStart);
                            oscillator.stop(noteStart + 0.24);
                        });
                    }).catch(error => {
                        console.error("ØªØ¹Ø°Ø± ØªØ´ØºÙŠÙ„ ØµÙˆØª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚:", error);
                        if (force) showToast(t("audioFailed"));
                    });
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± ØªØ´ØºÙŠÙ„ ØµÙˆØª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚:", error);
                    if (force) showToast(t("audioFailed"));
                }
            }

            function visibleTransactions() {
                const key = monthKey(selectedMonth);
                return data.transactions.filter(item => item.date.slice(0, 7) === key);
            }

            function render() {
                document.getElementById("monthLabel").textContent = monthFormatter.format(selectedMonth);
                const transactions = visibleTransactions();
                const income = transactions.filter(item => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
                const expenses = transactions.filter(item => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);
                document.getElementById("balanceAmount").innerHTML = formatter.format(income - expenses) + " <small>" + currencyUnit() + "</small>";
                document.getElementById("incomeAmount").innerHTML = formatter.format(income) + " <small>" + currencyUnit() + "</small>";
                document.getElementById("expenseAmount").innerHTML = formatter.format(expenses) + " <small>" + currencyUnit() + "</small>";

                const budget = Number(data.budgets[monthKey(selectedMonth)]) || 0;
                const spent = expenses;
                const percentage = budget > 0 ? spent / budget * 100 : 0;
                const bar = document.getElementById("budgetBar");
                bar.style.width = Math.min(percentage, 100) + "%";
                bar.className = percentage >= 100 ? "over" : percentage >= 80 ? "warning" : "";
                const progress = bar.parentElement;
                progress.setAttribute("aria-valuenow", String(Math.round(Math.min(percentage, 100))));
                document.getElementById("budgetSpent").textContent = formatMoney(spent);
                document.getElementById("budgetTotal").textContent = budget ? formatMoney(budget) : t("budgetNotSet");
                document.getElementById("editBudget").textContent = t(budget ? "budgetChange" : "budgetSet");
                const remaining = budget - spent;
                document.getElementById("budgetCaption").textContent = budget
                    ? t("budgetUsed", { percent: Math.round(percentage) })
                    : t("budgetDefault");
                document.getElementById("budgetRemaining").textContent = budget
                    ? t(remaining >= 0 ? "budgetRemaining" : "budgetOver", { amount: formatMoney(Math.abs(remaining)) })
                    : t("startBudget");
                renderMoneyTip(transactions, income, expenses, budget, percentage);

                const filtered = transactions
                    .filter(item => filterType === "all" || item.type === filterType)
                    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
                document.getElementById("transactionCount").textContent = t(transactions.length === 1 ? "transactionCountOne" : "transactionCountMany", { count: transactions.length });
                const list = document.getElementById("transactionList");
                list.replaceChildren();
                if (filtered.length === 0) {
                    const empty = document.createElement("div");
                    empty.className = "empty-state";
                    empty.innerHTML = '<span aria-hidden="true">ðŸ§¾</span>';
                    empty.append(document.createTextNode(t(transactions.length ? "emptyFilter" : "emptyTransactions")));
                    list.append(empty);
                } else {
                    filtered.forEach(item => list.append(createTransactionRow(item)));
                }
                renderCategories(transactions);
                renderGoals();
                renderDailyChallenge();
                renderTrendChart();
            }

            function renderMoneyTip(transactions, income, expenses, budget, percentage) {
                let tip;
                if (transactions.length === 0) {
                    tip = t("moneyTipStart");
                } else if (budget > 0 && percentage >= 100) {
                    tip = t("moneyTipOverBudget");
                } else if (budget > 0 && percentage >= 80) {
                    tip = t("moneyTipNearBudget", { percent: Math.round(percentage) });
                } else if (income > 0 && expenses > income) {
                    tip = t("moneyTipBalance");
                } else if (budget === 0) {
                    tip = t("moneyTipSetBudget");
                } else if (expenses > 0) {
                    const categoryTotals = new Map();
                    transactions.filter(item => item.type === "expense").forEach(item => {
                        categoryTotals.set(item.category, (categoryTotals.get(item.category) || 0) + item.amount);
                    });
                    const [category, amount] = [...categoryTotals.entries()].sort((a, b) => b[1] - a[1])[0];
                    tip = t("moneyTipCategory", {
                        category: t(categoryKeys[category] || "categoryOther"),
                        percent: Math.round(amount / expenses * 100)
                    });
                } else {
                    tip = t("moneyTipSave");
                }
                document.getElementById("moneyTipText").textContent = tip;
            }

            function renderDailyChallenge() {
                const today = localDateValue(new Date());
                const amounts = [5, 10, 20, 50];
                const day = Number(today.slice(-2));
                const amount = amounts[day % amounts.length];
                const completed = new Set(data.dailyChallenges);
                document.getElementById("dailyChallengeAmount").textContent = formatter.format(amount);
                document.getElementById("dailyChallengeCurrency").textContent = currencyUnit();
                document.getElementById("dailyChallengeStreak").textContent = t("dailyChallengeStreak", { count: getChallengeStreak(completed, today) });
                const button = document.getElementById("completeDailyChallenge");
                button.disabled = completed.has(today);
                button.textContent = t(completed.has(today) ? "dailyChallengeDone" : "dailyChallengeButton");
            }

            function formatChallengeMoney(amount, currency) {
                return formatter.format(amount) + " " + currency;
            }

            function renderSocialChallenges() {
                const container = document.getElementById("socialChallengeList");
                const empty = document.getElementById("socialChallengeEmpty");
                container.replaceChildren();
                empty.hidden = socialChallenges.length > 0;
                empty.textContent = t(authToken ? "challengeEmptySignedIn" : "challengeEmpty");
                const dateFormatter = new Intl.DateTimeFormat(
                    language === "ar" ? "ar-MA" : language === "fr" ? "fr-MA" : "en-US",
                    { dateStyle: "medium" }
                );

                socialChallenges.forEach(challenge => {
                    const card = document.createElement("article");
                    card.className = "social-challenge-item";
                    const heading = document.createElement("div");
                    heading.className = "social-challenge-heading";
                    const title = document.createElement("h3");
                    title.textContent = challenge.title;
                    const invite = document.createElement("button");
                    invite.className = "social-challenge-share";
                    invite.type = "button";
                    invite.dataset.shareChallenge = challenge.id;
                    invite.textContent = t("challengeInvite");
                    heading.append(title, invite);

                    const metadata = document.createElement("p");
                    metadata.className = "social-challenge-meta";
                    metadata.textContent = t("challengeTarget") + ": " +
                        formatChallengeMoney(challenge.target, challenge.currency) + " Â· " +
                        t("challengeDeadline") + ": " +
                        dateFormatter.format(new Date(challenge.deadline + "T00:00:00"));

                    const participants = document.createElement("div");
                    participants.className = "social-challenge-participants";
                    participants.setAttribute("aria-label", t("challengeParticipants"));
                    [...challenge.participants]
                        .sort((left, right) => right.progress - left.progress)
                        .forEach(participant => {
                            const participantItem = document.createElement("div");
                            const row = document.createElement("div");
                            row.className = "social-challenge-participant";
                            const name = document.createElement("strong");
                            name.textContent = participant.name + (participant.isYou ? " " + t("challengeYou") : "");
                            const progress = document.createElement("span");
                            progress.textContent = formatChallengeMoney(participant.progress, challenge.currency);
                            row.append(name, progress);

                            const track = document.createElement("div");
                            track.className = "social-challenge-progress";
                            track.setAttribute("role", "progressbar");
                            track.setAttribute("aria-label", participant.name + " â€” " + t("challengeProgress"));
                            track.setAttribute("aria-valuemin", "0");
                            track.setAttribute("aria-valuemax", "100");
                            const percent = Math.min(100, Math.round(participant.progress / challenge.target * 100));
                            track.setAttribute("aria-valuenow", String(percent));
                            const fill = document.createElement("span");
                            fill.style.width = percent + "%";
                            track.append(fill);
                            participantItem.append(row, track);
                            participants.append(participantItem);
                        });

                    card.append(heading, metadata, participants);
                    const currentUser = challenge.participants.find(participant => participant.isYou);
                    if (currentUser) {
                        const form = document.createElement("form");
                        form.className = "social-challenge-progress-form";
                        form.dataset.challengeId = challenge.id;
                        const field = document.createElement("label");
                        field.className = "field";
                        const label = document.createElement("span");
                        label.textContent = t("challengeProgress");
                        const input = document.createElement("input");
                        input.type = "number";
                        input.min = "0";
                        input.max = String(challenge.target);
                        input.step = "0.01";
                        input.value = String(currentUser.progress);
                        input.required = true;
                        field.append(label, input);
                        const submit = document.createElement("button");
                        submit.className = "primary-button";
                        submit.type = "submit";
                        submit.textContent = t("challengeUpdate");
                        form.append(field, submit);
                        card.append(form);
                    }
                    container.append(card);
                });
            }

            function getChallengeStreak(completed, today) {
                const date = new Date();
                if (!completed.has(today)) date.setDate(date.getDate() - 1);
                let streak = 0;
                while (streak < 365 && completed.has(localDateValue(date))) {
                    streak++;
                    date.setDate(date.getDate() - 1);
                }
                return streak;
            }

            function renderGoals() {
                const container = document.getElementById("goalList");
                container.replaceChildren();
                document.getElementById("goalEmpty").hidden = data.goals.length > 0;
                renderSavingsTree();
                data.goals.forEach(goal => {
                    const item = document.createElement("article");
                    item.className = "goal-item";
                    const heading = document.createElement("div");
                    heading.className = "goal-heading";
                    const name = document.createElement("h3");
                    name.className = "goal-name";
                    name.textContent = goal.name;
                    const percent = Math.min(100, Math.round(goal.saved / goal.target * 100));
                    const status = document.createElement("span");
                    status.className = "transaction-meta";
                    status.textContent = percent >= 100 ? t("goalCompleted") : t("goalProgress") + ": " + percent + "%";
                    heading.append(name, status);

                    const details = document.createElement("div");
                    details.className = "goal-details";
                    const saved = document.createElement("span");
                    saved.textContent = formatMoney(goal.saved);
                    const target = document.createElement("span");
                    target.textContent = formatMoney(goal.target);
                    details.append(saved, target);

                    const track = document.createElement("div");
                    track.className = "goal-track";
                    track.setAttribute("role", "progressbar");
                    track.setAttribute("aria-label", goal.name + " â€” " + t("goalProgress"));
                    track.setAttribute("aria-valuemin", "0");
                    track.setAttribute("aria-valuemax", "100");
                    track.setAttribute("aria-valuenow", String(percent));
                    const fill = document.createElement("span");
                    fill.style.width = percent + "%";
                    track.append(fill);

                    const actions = document.createElement("div");
                    actions.className = "goal-actions";
                    if (goal.saved < goal.target) {
                        const contribute = document.createElement("button");
                        contribute.className = "text-button";
                        contribute.type = "button";
                        contribute.textContent = t("addContribution");
                        contribute.addEventListener("click", () => openContribution(goal));
                        actions.append(contribute);
                    }
                    const remove = document.createElement("button");
                    remove.className = "goal-delete";
                    remove.type = "button";
                    remove.textContent = t("deleteGoal");
                    remove.addEventListener("click", () => deleteGoal(goal.id));
                    actions.append(remove);
                    item.append(heading, details, track, actions);
                    container.append(item);
                });
            }

            function renderSavingsTree() {
                const saved = data.goals.reduce((total, goal) => total + goal.saved, 0);
                const target = data.goals.reduce((total, goal) => total + goal.target, 0);
                const progress = target > 0 ? Math.min(100, Math.round(saved / target * 100)) : 0;
                const stage = progress === 100 ? 5 : Math.floor(progress / 20);
                const tree = document.getElementById("savingsTree");
                tree.dataset.stage = String(stage);
                document.getElementById("savingsTreeSaved").textContent = formatter.format(saved);
                document.getElementById("savingsTreeCurrency").textContent = currencyUnit();
                const progressBar = document.getElementById("savingsTreeProgress");
                progressBar.setAttribute("aria-label", t("savingsTreeProgress"));
                progressBar.setAttribute("aria-valuenow", String(progress));
                document.getElementById("savingsTreeProgressBar").style.width = progress + "%";
                document.getElementById("savingsTreeStatus").textContent = !data.goals.length
                    ? t("savingsTreeEmpty")
                    : t("savingsTreeStage" + stage);
                tree.querySelectorAll(".tree-leaves").forEach(leaves => {
                    leaves.classList.toggle("is-grown", stage >= Number(leaves.dataset.growth));
                });
                tree.querySelector(".tree-seed").classList.toggle("is-hidden", stage > 0);
            }

            function openContribution(goal) {
                document.getElementById("contributionGoalName").textContent = goal.name + " â€” " + t("budgetRemaining", { amount: formatMoney(goal.target - goal.saved) });
                document.getElementById("contributionAmount").value = "";
                document.getElementById("contributionForm").dataset.goalId = goal.id;
                openModal("contributionModal");
                playUiSound("open");
            }

            function deleteGoal(id) {
                const previousGoals = data.goals;
                data.goals = data.goals.filter(goal => goal.id !== id);
                if (saveData()) {
                    renderGoals();
                    showToast(t("goalDeleted"));
                    playUiSound("remove");
                } else {
                    data.goals = previousGoals;
                }
            }

            function collectBudgetAlerts(key, previousPercentage, currentPercentage) {
                const triggered = [];
                [80, 100].forEach(threshold => {
                    const alertKey = key + ":" + threshold;
                    if (previousPercentage < threshold && currentPercentage >= threshold && !data.budgetAlerts.includes(alertKey)) {
                        data.budgetAlerts.push(alertKey);
                        triggered.push(threshold);
                    }
                });
                return triggered;
            }

            function renderTrendChart() {
                const locale = language === "ar" ? "ar-MA" : language === "fr" ? "fr-MA" : "en-US";
                const shortMonth = new Intl.DateTimeFormat(locale, { month: "short" });
                const shortWeekday = new Intl.DateTimeFormat(locale, { weekday: "short" });
                const colors = ["#087d53", "#16b87b", "#65d5a4", "#afe9cf", "#68ad8b", "#d5eee1"];
                const today = new Date();
                const isCurrentMonth = monthKey(selectedMonth) === monthKey(today);
                const endDate = isCurrentMonth
                    ? new Date(today.getFullYear(), today.getMonth(), today.getDate())
                    : selectedMonth > today
                        ? new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1)
                        : new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
                const addDays = (date, amount) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
                const addMonths = (date, amount) => new Date(date.getFullYear(), date.getMonth() + amount, 1);
                const isoDate = date => localDateValue(date);
                const sumType = (transactions, type) => transactions
                    .filter(item => item.type === type)
                    .reduce((sum, item) => sum + item.amount, 0);
                const between = (start, end) => {
                    const first = isoDate(start);
                    const last = isoDate(end);
                    return data.transactions.filter(item => item.date >= first && item.date <= last);
                };

                let buckets;
                let currentStart;
                let previousStart;
                let previousEnd;
                let currentTransactions;
                if (trendPeriod === "week") {
                    currentStart = addDays(endDate, -6);
                    previousEnd = addDays(currentStart, -1);
                    previousStart = addDays(previousEnd, -6);
                    buckets = Array.from({ length: 7 }, (_, index) => {
                        const date = addDays(currentStart, index);
                        const transactions = between(date, date);
                        return {
                            label: shortWeekday.format(date),
                            income: sumType(transactions, "income"),
                            expenses: sumType(transactions, "expense"),
                            title: new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(date)
                        };
                    });
                    currentTransactions = between(currentStart, endDate);
                } else if (trendPeriod === "year") {
                    currentStart = new Date(selectedMonth.getFullYear(), 0, 1);
                    previousStart = new Date(selectedMonth.getFullYear() - 1, 0, 1);
                    previousEnd = new Date(selectedMonth.getFullYear() - 1, endDate.getMonth(), endDate.getDate());
                    buckets = Array.from({ length: 12 }, (_, index) => {
                        const month = new Date(selectedMonth.getFullYear(), index, 1);
                        const transactions = between(month, new Date(month.getFullYear(), month.getMonth() + 1, 0));
                        return {
                            label: shortMonth.format(month),
                            income: sumType(transactions, "income"),
                            expenses: sumType(transactions, "expense"),
                            title: monthFormatter.format(month)
                        };
                    });
                    currentTransactions = between(currentStart, endDate);
                } else {
                    currentStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
                    previousStart = addMonths(currentStart, -1);
                    previousEnd = new Date(currentStart.getFullYear(), currentStart.getMonth(), 0);
                    buckets = Array.from({ length: 6 }, (_, index) => {
                        const month = addMonths(selectedMonth, index - 5);
                        const transactions = between(month, new Date(month.getFullYear(), month.getMonth() + 1, 0));
                        return {
                            label: shortMonth.format(month),
                            income: sumType(transactions, "income"),
                            expenses: sumType(transactions, "expense"),
                            title: monthFormatter.format(month)
                        };
                    });
                    currentStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
                    currentTransactions = between(currentStart, endDate);
                }

                const rangeLabel = trendPeriod === "week" ? "trendWeekRange" : trendPeriod === "year" ? "trendYearRange" : "trendMonthRange";
                document.getElementById("trendSubtitle").textContent = t(rangeLabel);
                const chart = document.getElementById("trendChart");
                chart.setAttribute("aria-label", t("comparisonTitle") + " â€” " + t(rangeLabel));
                chart.replaceChildren();
                const maxValue = Math.max(0, ...buckets.flatMap(item => [item.income, item.expenses]));
                buckets.forEach(item => {
                    const group = document.createElement("div");
                    group.className = "trend-bar-group";
                    group.setAttribute("aria-label", item.title);
                    const pair = document.createElement("div");
                    pair.className = "trend-bar-pair";
                    [["income", "trendIncomeAria"], ["expenses", "trendExpensesAria"]].forEach(([key, labelKey]) => {
                        const bar = document.createElement("span");
                        bar.className = "trend-bar " + key;
                        const height = maxValue ? item[key] / maxValue * 100 : 0;
                        bar.style.height = height + "%";
                        bar.title = t(labelKey) + " Â· " + item.title + ": " + formatMoney(item[key]);
                        pair.append(bar);
                    });
                    const label = document.createElement("span");
                    label.className = "trend-bar-label";
                    label.textContent = item.label;
                    group.append(pair, label);
                    chart.append(group);
                });

                const totals = new Map();
                currentTransactions.filter(item => item.type === "expense").forEach(item => {
                    totals.set(item.category, (totals.get(item.category) || 0) + item.amount);
                });
                const categoriesBySpend = [...totals.entries()].sort((a, b) => b[1] - a[1]);
                const categoryTotal = categoriesBySpend.reduce((sum, [, amount]) => sum + amount, 0);
                const topCategories = categoriesBySpend.slice(0, 5);
                if (categoriesBySpend.length > 5) {
                    const otherAmount = categoriesBySpend.slice(5).reduce((sum, [, amount]) => sum + amount, 0);
                    topCategories.push(["Ø£Ø®Ø±Ù‰", otherAmount]);
                }
                let angle = 0;
                const stops = [];
                const legend = document.getElementById("categoryLegend");
                legend.replaceChildren();
                topCategories.forEach(([category, amount], index) => {
                    const percent = categoryTotal ? amount / categoryTotal * 100 : 0;
                    const nextAngle = angle + percent * 3.6;
                    stops.push(colors[index % colors.length] + " " + angle + "deg " + nextAngle + "deg");
                    angle = nextAngle;
                    const entry = document.createElement("div");
                    entry.className = "category-legend-item";
                    entry.style.setProperty("--category-color", colors[index % colors.length]);
                    const dot = document.createElement("span");
                    dot.className = "category-legend-dot";
                    dot.setAttribute("aria-hidden", "true");
                    const name = document.createElement("span");
                    name.className = "category-legend-name";
                    name.textContent = t(categoryKeys[category] || "categoryOther");
                    const value = document.createElement("span");
                    value.className = "category-legend-value";
                    value.textContent = Math.round(percent) + "%";
                    entry.append(dot, name, value);
                    legend.append(entry);
                });
                const donut = document.getElementById("spendingDonut");
                donut.style.setProperty("--donut-stops", stops.length ? stops.join(", ") : "#e8f1ed 0deg 360deg");
                const currency = currencyUnit();
                document.getElementById("donutAmount").textContent = formatter.format(categoryTotal);
                document.getElementById("donutCurrency").textContent = currency;
                document.getElementById("categoryTotal").textContent = formatMoney(categoryTotal);
                document.getElementById("categoryChartEmpty").hidden = categoryTotal > 0;
                const categoryDescription = topCategories
                    .map(([category, amount]) => t(categoryKeys[category] || "categoryOther") + " " + Math.round(amount / categoryTotal * 100) + "%")
                    .join(", ");
                donut.setAttribute("aria-label", categoryTotal
                    ? t("categoryChartTitle") + ": " + formatMoney(categoryTotal) + ". " + categoryDescription
                    : t("categoryChartTitle") + ": " + t("categoryChartEmpty"));

                const currentNet = sumType(currentTransactions, "income") - sumType(currentTransactions, "expense");
                const previousTransactions = between(previousStart, previousEnd);
                const previousNet = sumType(previousTransactions, "income") - sumType(previousTransactions, "expense");
                const difference = Math.round(Math.abs(currentNet - previousNet) * 100) / 100;
                const insight = currentNet > previousNet ? "savingsImproved" : currentNet < previousNet ? "savingsReduced" : "savingsSame";
                document.getElementById("savingsInsightText").textContent = insight === "savingsSame"
                    ? t(insight)
                    : t(insight, { amount: formatMoney(difference) });
            }

            function createTransactionRow(item) {
                const row = document.createElement("article");
                row.className = "transaction";
                const icon = document.createElement("div");
                icon.className = "transaction-icon";
                icon.textContent = categories[item.category] || categories["Ø£Ø®Ø±Ù‰"];
                icon.setAttribute("aria-hidden", "true");
                const details = document.createElement("div");
                const title = document.createElement("p");
                title.className = "transaction-title";
                title.textContent = item.description;
                const meta = document.createElement("p");
                meta.className = "transaction-meta";
                const locale = language === "ar" ? "ar-MA" : language === "fr" ? "fr-MA" : "en-US";
                meta.textContent = t(categoryKeys[item.category] || "categoryOther") + " Â· " + new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(new Date(item.date + "T12:00:00"));
                details.append(title, meta);
                const amount = document.createElement("span");
                amount.className = "transaction-amount" + (item.type === "income" ? " income" : "");
                amount.textContent = (item.type === "income" ? "+ " : "âˆ’ ") + formatMoney(item.amount);
                const remove = document.createElement("button");
                remove.className = "delete-button";
                remove.type = "button";
                remove.textContent = "Ã—";
                remove.setAttribute("aria-label", t("deleteTransaction", { description: item.description }));
                remove.addEventListener("click", () => deleteTransaction(item.id));
                row.append(icon, details, amount, remove);
                return row;
            }

            function renderCategories(transactions) {
                const totals = {};
                transactions.filter(item => item.type === "expense").forEach(item => {
                    totals[item.category] = (totals[item.category] || 0) + item.amount;
                });
                const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
                const container = document.getElementById("categoryList");
                container.replaceChildren();
                if (!sorted.length) {
                    const empty = document.createElement("div");
                    empty.className = "category-empty";
                    empty.textContent = t("emptyCategories");
                    container.append(empty);
                    return;
                }
                const largest = sorted[0][1];
                sorted.forEach(([category, total]) => {
                    const row = document.createElement("div");
                    row.className = "category-row";
                    const label = document.createElement("div");
                    label.className = "category-label";
                    const name = document.createElement("span");
                    name.textContent = (categories[category] || categories["Ø£Ø®Ø±Ù‰"]) + "  " + t(categoryKeys[category] || "categoryOther");
                    const amount = document.createElement("span");
                    amount.textContent = formatMoney(total);
                    label.append(name, amount);
                    const track = document.createElement("div");
                    track.className = "category-track";
                    const fill = document.createElement("span");
                    fill.style.width = (total / largest * 100) + "%";
                    track.append(fill);
                    row.append(label, track);
                    container.append(row);
                });
            }

            function openModal(id) {
                const modal = document.getElementById(id);
                modal.hidden = false;
                modal.classList.add("open");
                const firstInput = modal.querySelector("input:not([type=hidden])");
                if (firstInput) firstInput.focus();
            }

            function closeModal(id) {
                const modal = document.getElementById(id);
                modal.classList.remove("open");
                modal.hidden = true;
            }

            let toastTimer;
            function notificationStorageKey() {
                const owner = authToken ? "account-" + encodeURIComponent(accountEmail.toLowerCase()) : "guest";
                return NOTIFICATIONS_KEY + "-" + owner;
            }

            function loadNotifications() {
                try {
                    const saved = JSON.parse(localStorage.getItem(notificationStorageKey()) || "[]");
                    if (!Array.isArray(saved)) throw new Error("Stored notifications are not a list.");
                    return saved.filter(item =>
                        item && typeof item.id === "string" &&
                        ["budget80", "budget100", "contribution", "goalCompleted"].includes(item.kind) &&
                        typeof item.createdAt === "number" && Number.isFinite(item.createdAt) &&
                        Number.isFinite(new Date(item.createdAt).valueOf()) &&
                        typeof item.read === "boolean" &&
                        (item.kind === "budget80" || item.kind === "budget100" ||
                            (typeof item.goalName === "string" &&
                                (item.kind === "goalCompleted" ||
                                    (typeof item.amount === "number" && Number.isFinite(item.amount) && item.amount > 0))))
                    ).slice(0, 100);
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª:", error);
                    return [];
                }
            }

            function saveNotifications() {
                try {
                    localStorage.setItem(notificationStorageKey(), JSON.stringify(notifications));
                    return true;
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± Ø­ÙØ¸ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª:", error);
                    showToast(t("notificationSaveError"));
                    return false;
                }
            }

            function addNotification(kind, details = {}) {
                const previous = notifications;
                notifications = [{
                    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                    kind,
                    createdAt: Date.now(),
                    read: false,
                    ...details
                }, ...notifications].slice(0, 100);
                if (!saveNotifications()) notifications = previous;
                renderNotifications();
                return notifications !== previous;
            }

            function renderNotifications() {
                const list = document.getElementById("notificationList");
                if (!list) return;
                list.replaceChildren();
                const unreadCount = notifications.filter(item => !item.read).length;
                const badge = document.getElementById("notificationBadge");
                badge.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
                badge.hidden = unreadCount === 0;
                const toggle = document.getElementById("toggleNotifications");
                toggle.setAttribute("aria-label", t("notificationsButton") + (unreadCount ? " (" + unreadCount + ")" : ""));
                document.getElementById("markNotificationsRead").disabled = unreadCount === 0;
                document.getElementById("clearNotifications").hidden = notifications.length === 0;
                document.getElementById("notificationsEmpty").hidden = notifications.length > 0;
                const locale = language === "ar" ? "ar-MA" : language === "fr" ? "fr-MA" : "en-US";
                const dateFormatter = new Intl.DateTimeFormat(locale, {
                    month: "short", day: "numeric", hour: "numeric", minute: "2-digit"
                });
                notifications.forEach(notification => {
                    const item = document.createElement("button");
                    item.className = "notification-item" + (notification.read ? "" : " is-unread");
                    item.type = "button";
                    const title = document.createElement("strong");
                    title.textContent = t(notification.kind === "budget80" || notification.kind === "budget100"
                        ? "budgetNotificationTitle" : "savingsNotificationTitle");
                    const message = document.createElement("span");
                    if (notification.kind === "budget80" || notification.kind === "budget100") {
                        message.textContent = t(notification.kind === "budget80" ? "budgetWarning" : "budgetExceededAlert");
                    } else if (notification.kind === "goalCompleted") {
                        message.textContent = t("notificationGoalReached", { goal: notification.goalName });
                    } else {
                        message.textContent = t("notificationContribution", {
                            amount: formatMoney(notification.amount),
                            goal: notification.goalName
                        });
                    }
                    const time = document.createElement("time");
                    time.dateTime = new Date(notification.createdAt).toISOString();
                    time.textContent = dateFormatter.format(notification.createdAt);
                    item.append(title, message, time);
                    item.addEventListener("click", () => {
                        if (notification.read) return;
                        const previous = notifications;
                        notifications = notifications.map(entry => entry.id === notification.id ? { ...entry, read: true } : entry);
                        if (!saveNotifications()) notifications = previous;
                        renderNotifications();
                    });
                    list.append(item);
                });
            }

            function showToast(message) {
                const current = document.querySelector(".toast");
                if (current) current.remove();
                const toast = document.createElement("div");
                toast.className = "toast";
                toast.setAttribute("role", "status");
                toast.textContent = message;
                document.body.append(toast);
                clearTimeout(toastTimer);
                toastTimer = setTimeout(() => toast.remove(), 2800);
            }

            function deleteTransaction(id) {
                data.transactions = data.transactions.filter(item => item.id !== id);
                if (saveData()) {
                    render();
                    playUiSound("remove");
                }
            }

            function commitTransaction(transaction) {
                const alertKey = transaction.date.slice(0, 7);
                const previousAlerts = data.budgetAlerts.slice();
                let triggeredBudgetAlerts = [];
                if (transaction.type === "expense") {
                    const oldSpent = data.transactions
                        .filter(item => item.type === "expense" && item.date.slice(0, 7) === alertKey)
                        .reduce((sum, item) => sum + item.amount, 0);
                    const budget = Number(data.budgets[alertKey]) || 0;
                    if (budget > 0) {
                        triggeredBudgetAlerts = collectBudgetAlerts(alertKey, oldSpent / budget * 100, (oldSpent + transaction.amount) / budget * 100);
                    }
                }
                data.transactions.push(transaction);
                if (saveData()) {
                    render();
                    showToast(triggeredBudgetAlerts.length
                        ? t(triggeredBudgetAlerts[triggeredBudgetAlerts.length - 1] >= 100 ? "budgetExceededAlert" : "budgetWarning")
                        : t("transactionSaved"));
                    playUiSound("success");
                    return true;
                }
                data.transactions = data.transactions.filter(item => item.id !== transaction.id);
                data.budgetAlerts = previousAlerts;
                return false;
            }

            const QUICK_LAST_KEY = "flousi-quick-category-v1";
            const quickCategoryNames = Object.keys(categories).filter(name => name !== "Ø§Ù„Ø¯Ø®Ù„");
            let quickAmount = "";
            let quickCategory = quickCategoryNames[0];

            function loadQuickCategory() {
                try {
                    const saved = localStorage.getItem(QUICK_LAST_KEY);
                    return quickCategoryNames.includes(saved) ? saved : quickCategoryNames[0];
                } catch (error) {
                    return quickCategoryNames[0];
                }
            }

            function rememberQuickCategory(name) {
                try { localStorage.setItem(QUICK_LAST_KEY, name); } catch (error) { /* storage unavailable: skip */ }
            }

            function renderQuickAmount() {
                document.getElementById("quickAmountValue").textContent = quickAmount || "0";
            }

            function renderQuickChips() {
                document.getElementById("quickChips").replaceChildren(...quickCategoryNames.map(name => {
                    const chip = document.createElement("button");
                    chip.type = "button";
                    chip.className = "quick-chip" + (name === quickCategory ? " active" : "");
                    chip.dataset.category = name;
                    chip.setAttribute("aria-pressed", String(name === quickCategory));
                    chip.textContent = categories[name] + " " + t(categoryKeys[name]);
                    return chip;
                }));
            }

            function pressQuickKey(key) {
                if (key === "back") {
                    quickAmount = quickAmount.slice(0, -1);
                } else if (key === ".") {
                    if (!quickAmount.includes(".")) quickAmount = (quickAmount || "0") + ".";
                } else if (/^\d$/.test(key)) {
                    const [whole, decimals] = (quickAmount + key).split(".");
                    if (decimals !== undefined ? decimals.length > 2 : whole.length > 9) return;
                    quickAmount = quickAmount === "0" ? key : quickAmount + key;
                }
                renderQuickAmount();
            }

            function addQuickAmount(value) {
                const total = Math.round(((Number(quickAmount) || 0) + value) * 100) / 100;
                if (total > 999999999) return;
                quickAmount = String(total);
                renderQuickAmount();
            }

            document.querySelectorAll("[data-quick-cash]").forEach(button => {
                button.addEventListener("click", () => {
                    quickAmount = "";
                    quickCategory = loadQuickCategory();
                    document.getElementById("quickNote").value = "";
                    document.getElementById("quickAmountUnit").textContent = currencyUnit();
                    renderQuickAmount();
                    renderQuickChips();
                    openModal("quickCashModal");
                    if (document.activeElement) document.activeElement.blur();
                    playUiSound("open");
                });
            });
            document.getElementById("quickCashModal").addEventListener("click", event => {
                const button = event.target.closest("button");
                if (!button) return;
                if (button.dataset.key) pressQuickKey(button.dataset.key);
                else if (button.dataset.add) addQuickAmount(Number(button.dataset.add));
                else if (button.dataset.category) {
                    quickCategory = button.dataset.category;
                    renderQuickChips();
                }
            });
            document.addEventListener("keydown", event => {
                if (!document.getElementById("quickCashModal").classList.contains("open")) return;
                if (event.target.id === "quickNote" || event.ctrlKey || event.metaKey || event.altKey) return;
                if (/^\d$/.test(event.key) || event.key === ".") pressQuickKey(event.key);
                else if (event.key === ",") pressQuickKey(".");
                else if (event.key === "Backspace") pressQuickKey("back");
                else return;
                event.preventDefault();
            });
            document.getElementById("quickCashForm").addEventListener("submit", event => {
                event.preventDefault();
                const amount = Number(quickAmount);
                if (!Number.isFinite(amount) || amount <= 0 || amount > 999999999) {
                    showToast(t("transactionInvalid"));
                    return;
                }
                const note = document.getElementById("quickNote").value.trim();
                const transaction = {
                    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                    type: "expense",
                    description: note || t(categoryKeys[quickCategory]),
                    amount: Math.round(amount * 100) / 100,
                    category: quickCategory,
                    date: localDateValue(new Date())
                };
                if (commitTransaction(transaction)) {
                    rememberQuickCategory(quickCategory);
                    closeModal("quickCashModal");
                }
            });

            document.getElementById("openTransaction").addEventListener("click", () => {
                document.getElementById("date").value = localDateValue(new Date());
                openModal("transactionModal");
                playUiSound("open");
            });
            document.getElementById("editBudget").addEventListener("click", () => {
                document.getElementById("budgetInput").value = data.budgets[monthKey(selectedMonth)] || "";
                openModal("budgetModal");
                playUiSound("open");
            });
            document.getElementById("addGoal").addEventListener("click", () => {
                document.getElementById("goalForm").reset();
                openModal("goalModal");
                playUiSound("open");
            });
            document.getElementById("completeDailyChallenge").addEventListener("click", () => {
                const today = localDateValue(new Date());
                if (data.dailyChallenges.includes(today)) return;
                const previousChallenges = data.dailyChallenges;
                data.dailyChallenges = [...new Set([...previousChallenges, today])].sort().slice(-365);
                if (saveData()) {
                    renderDailyChallenge();
                    showToast(t("dailyChallengeDone"));
                    playUiSound("success");
                } else {
                    data.dailyChallenges = previousChallenges;
                }
            });
            document.getElementById("goalForm").addEventListener("submit", event => {
                event.preventDefault();
                const name = document.getElementById("goalName").value.trim();
                const target = Number(document.getElementById("goalTarget").value);
                if (!name || !Number.isFinite(target) || target <= 0 || target > 999999999) {
                    showToast(t("goalInvalid"));
                    return;
                }
                const goal = {
                    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                    name,
                    target: Math.round(target * 100) / 100,
                    saved: 0
                };
                data.goals.push(goal);
                if (saveData()) {
                    closeModal("goalModal");
                    renderGoals();
                    showToast(t("goalSaved"));
                    playUiSound("success");
                } else {
                    data.goals = data.goals.filter(item => item.id !== goal.id);
                }
            });
            document.getElementById("contributionForm").addEventListener("submit", event => {
                event.preventDefault();
                const goal = data.goals.find(item => item.id === event.currentTarget.dataset.goalId);
                const amount = Number(document.getElementById("contributionAmount").value);
                if (!goal || !Number.isFinite(amount) || amount <= 0 || amount > 999999999) {
                    showToast(t("contributionInvalid"));
                    return;
                }
                const contribution = Math.round(amount * 100) / 100;
                const remaining = Math.round((goal.target - goal.saved) * 100) / 100;
                if (contribution > remaining) {
                    showToast(t("contributionTooHigh"));
                    return;
                }
                const previous = goal.saved;
                goal.saved = Math.round((goal.saved + contribution) * 100) / 100;
                if (saveData()) {
                    closeModal("contributionModal");
                    renderGoals();
                    const notificationSaved = addNotification(
                        goal.saved === goal.target ? "goalCompleted" : "contribution",
                        { goalName: goal.name, amount: contribution }
                    );
                    showToast(notificationSaved
                        ? t(goal.saved === goal.target ? "goalCompleted" : "contributionSaved")
                        : t("notificationSaveError"));
                    playUiSound("success");
                } else {
                    goal.saved = previous;
                }
            });
            document.getElementById("openSettings").addEventListener("click", () => {
                openModal("settingsModal");
                playUiSound("open");
            });
            document.getElementById("toggleNotifications").addEventListener("click", event => {
                const panel = document.getElementById("notificationsPanel");
                panel.hidden = !panel.hidden;
                event.currentTarget.setAttribute("aria-expanded", String(!panel.hidden));
            });
            document.getElementById("markNotificationsRead").addEventListener("click", () => {
                const previous = notifications;
                notifications = notifications.map(item => ({ ...item, read: true }));
                if (!saveNotifications()) notifications = previous;
                renderNotifications();
            });
            document.getElementById("clearNotifications").addEventListener("click", () => {
                const previous = notifications;
                notifications = [];
                if (!saveNotifications()) notifications = previous;
                renderNotifications();
            });
            document.addEventListener("click", event => {
                const panel = document.getElementById("notificationsPanel");
                const toggle = document.getElementById("toggleNotifications");
                if (!panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) {
                    panel.hidden = true;
                    toggle.setAttribute("aria-expanded", "false");
                }
            });
            document.addEventListener("keydown", event => {
                if (event.key === "Escape") {
                    const panel = document.getElementById("notificationsPanel");
                    if (!panel.hidden) {
                        panel.hidden = true;
                        document.getElementById("toggleNotifications").setAttribute("aria-expanded", "false");
                    }
                }
            });
            document.getElementById("openHelp").addEventListener("click", () => {
                openModal("helpModal");
                document.querySelector("#helpModal .close-button").focus();
                playUiSound("open");
            });
            document.getElementById("createChallengeButton").addEventListener("click", () => {
                if (!requireChallengeAccount()) return;
                const deadline = new Date();
                deadline.setDate(deadline.getDate() + 7);
                document.getElementById("challengeDeadlineInput").min = localDateValue(new Date());
                document.getElementById("challengeDeadlineInput").value = localDateValue(deadline);
                document.getElementById("challengeCurrencyInput").value = settings.currency;
                openModal("createChallengeModal");
            });
            document.getElementById("joinChallengeButton").addEventListener("click", () => {
                if (!requireChallengeAccount()) return;
                if (pendingInviteId) document.getElementById("challengeCodeInput").value = pendingInviteId;
                openModal("joinChallengeModal");
                document.getElementById(pendingInviteId ? "joinDisplayNameInput" : "challengeCodeInput").focus();
            });
            document.getElementById("createChallengeForm").addEventListener("submit", async event => {
                event.preventDefault();
                if (!requireChallengeAccount()) return;
                const form = event.currentTarget;
                const submit = document.getElementById("createChallengeSubmit");
                submit.disabled = true;
                try {
                    const result = await apiRequest("/api/challenges", {
                        method: "POST",
                        body: JSON.stringify({
                            title: document.getElementById("challengeTitleInput").value.trim(),
                            target: Number(document.getElementById("challengeTargetInput").value),
                            currency: document.getElementById("challengeCurrencyInput").value,
                            deadline: document.getElementById("challengeDeadlineInput").value,
                            name: document.getElementById("challengeDisplayNameInput").value.trim()
                        })
                    });
                    replaceSocialChallenge(result.challenge);
                    closeModal("createChallengeModal");
                    form.reset();
                    showToast(t("challengeCreated"));
                } catch (error) {
                    console.error("Could not create a Flousi friend challenge:", error);
                    showToast(error.status ? error.message : t("apiUnavailable"));
                } finally {
                    submit.disabled = false;
                }
            });
            document.getElementById("joinChallengeForm").addEventListener("submit", async event => {
                event.preventDefault();
                if (!requireChallengeAccount()) return;
                const form = event.currentTarget;
                const id = document.getElementById("challengeCodeInput").value.trim();
                const name = document.getElementById("joinDisplayNameInput").value.trim();
                if (!/^[A-Za-z0-9_-]{16}$/.test(id)) {
                    showToast(t("challengeNotFound"));
                    return;
                }
                if (!name || name.length > 40) {
                    showToast(t("challengeMissingName"));
                    return;
                }
                const submit = document.getElementById("joinChallengeSubmit");
                submit.disabled = true;
                try {
                    const result = await apiRequest("/api/challenges/" + encodeURIComponent(id) + "/join", {
                        method: "POST",
                        body: JSON.stringify({ name })
                    });
                    replaceSocialChallenge(result.challenge);
                    closeModal("joinChallengeModal");
                    clearPendingChallengeInvite();
                    form.reset();
                    showToast(t("challengeJoined"));
                } catch (error) {
                    console.error("Could not join a Flousi friend challenge:", error);
                    showToast(error.status ? error.message : t("apiUnavailable"));
                } finally {
                    submit.disabled = false;
                }
            });
            document.getElementById("socialChallengeList").addEventListener("click", event => {
                const button = event.target.closest("[data-share-challenge]");
                if (button) copyChallengeInvite(button.dataset.shareChallenge);
            });
            document.getElementById("socialChallengeList").addEventListener("submit", async event => {
                const form = event.target.closest("form[data-challenge-id]");
                if (!form) return;
                event.preventDefault();
                const input = form.querySelector("input");
                const submit = form.querySelector("button[type=submit]");
                submit.disabled = true;
                try {
                    const result = await apiRequest(
                        "/api/challenges/" + encodeURIComponent(form.dataset.challengeId) + "/progress",
                        { method: "PUT", body: JSON.stringify({ progress: Number(input.value) }) }
                    );
                    replaceSocialChallenge(result.challenge);
                    showToast(t("challengeProgressSaved"));
                } catch (error) {
                    console.error("Could not update Flousi friend challenge progress:", error);
                    showToast(error.status ? error.message : t("apiUnavailable"));
                } finally {
                    submit.disabled = false;
                }
            });
            window.addEventListener("focus", () => {
                if (authToken) loadSocialChallenges();
            });
            document.getElementById("toggleTheme").addEventListener("click", () => {
                const previous = settings.darkMode;
                settings.darkMode = !previous;
                if (saveSettings()) {
                    applyTheme();
                } else {
                    settings.darkMode = previous;
                }
            });
            document.getElementById("manageAccount").addEventListener("click", () => {
                if (authToken) {
                    signOutAccount();
                    return;
                }
                closeModal("settingsModal");
                showLoginScreen();
            });
            document.getElementById("languageSelect").addEventListener("change", event => {
                const previous = language;
                language = event.target.value;
                settings.language = language;
                if (!saveSettings()) {
                    language = previous;
                    settings.language = previous;
                    event.target.value = previous;
                } else {
                    applyLanguage();
                    showToast(t("languageSaved"));
                }
            });
            document.getElementById("currencySelect").addEventListener("change", event => {
                const previous = settings.currency;
                settings.currency = event.target.value;
                if (!SUPPORTED_CURRENCIES.includes(settings.currency) || !saveSettings()) {
                    settings.currency = previous;
                    event.target.value = previous;
                } else {
                    applyLanguage();
                    showToast(t("currencySaved"));
                }
            });
            document.getElementById("soundToggle").addEventListener("change", event => {
                const previous = settings.sounds;
                settings.sounds = event.target.checked;
                if (!saveSettings()) {
                    settings.sounds = previous;
                    event.target.checked = previous;
                } else {
                    showToast(t("soundSaved"));
                }
            });
            document.getElementById("testSound").addEventListener("click", () => playUiSound("test", true));
            document.getElementById("exportDataButton").addEventListener("click", () => {
                try {
                    const backup = {
                        format: "flousi-data",
                        version: 1,
                        exportedAt: new Date().toISOString(),
                        data
                    };
                    const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "flousi-data-" + localDateValue(new Date()) + ".json";
                    link.click();
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± ØªØµØ¯ÙŠØ± Ø¨ÙŠØ§Ù†Ø§Øª Flousi:", error);
                    showToast(t("storageFailed"));
                }
            });
            document.getElementById("importDataButton").addEventListener("click", () => {
                document.getElementById("importDataFile").click();
            });
            document.getElementById("importDataFile").addEventListener("change", async event => {
                const file = event.target.files[0];
                event.target.value = "";
                if (!file) return;
                if (file.size > 10 * 1024 * 1024) {
                    showToast(t("importDataTooLarge"));
                    return;
                }
                let importedData;
                try {
                    const parsed = JSON.parse(await file.text());
                    const dataToImport = parsed && parsed.format === "flousi-data"
                        ? parsed.version === 1 ? parsed.data : null
                        : parsed;
                    importedData = validateImportData(dataToImport);
                } catch (error) {
                    console.error("ØªØ¹Ø°Ø± Ù‚Ø±Ø§Ø¡Ø© Ù…Ù„Ù Ø¨ÙŠØ§Ù†Ø§Øª Flousi:", error);
                    showToast(t("importDataInvalid"));
                    return;
                }
                const mergedData = importedData && mergeData(data, importedData);
                if (!mergedData) {
                    showToast(t("importDataInvalid"));
                    return;
                }
                const previousData = data;
                data = mergedData;
                if (!saveData(false)) {
                    data = previousData;
                    render();
                    return;
                }
                render();
                if (authToken) {
                    queueRemoteSync();
                    if (!await syncRemoteData()) return;
                }
                showToast(t("importDataMerged"));
            });
            document.querySelectorAll("[data-close]").forEach(button => {
                button.addEventListener("click", () => {
                    closeModal(button.dataset.close);
                    playUiSound("close");
                });
            });
            document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
                backdrop.addEventListener("click", event => {
                    if (event.target === backdrop) closeModal(backdrop.id);
                });
            });
            document.addEventListener("keydown", event => {
                if (event.key === "Escape") document.querySelectorAll(".modal-backdrop.open").forEach(modal => closeModal(modal.id));
            });
            document.querySelectorAll(".type-switch button").forEach(button => {
                button.addEventListener("click", () => {
                    document.querySelectorAll(".type-switch button").forEach(item => item.classList.toggle("active", item === button));
                    document.getElementById("transactionType").value = button.dataset.type;
                    const expense = button.dataset.type === "expense";
                    document.getElementById("categoryField").hidden = !expense;
                    document.getElementById("category").required = expense;
                });
            });
            document.getElementById("transactionForm").addEventListener("submit", event => {
                event.preventDefault();
                const type = document.getElementById("transactionType").value;
                const amount = Number(document.getElementById("amount").value);
                const description = document.getElementById("description").value.trim();
                const date = document.getElementById("date").value;
                if (!description || !Number.isFinite(amount) || amount <= 0 || amount > 999999999 || !date) {
                    showToast(t("transactionInvalid"));
                    return;
                }
                const transaction = {
                    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
                    type,
                    description,
                    amount: Math.round(amount * 100) / 100,
                    category: type === "income" ? "Ø§Ù„Ø¯Ø®Ù„" : document.getElementById("category").value,
                    date
                };

                if (commitTransaction(transaction)) {
                    event.target.reset();
                    document.getElementById("transactionType").value = "expense";
                    document.querySelectorAll(".type-switch button").forEach(item => item.classList.toggle("active", item.dataset.type === "expense"));
                    document.getElementById("categoryField").hidden = false;
                    document.getElementById("category").required = true;
                    closeModal("transactionModal");
                }

                    event.target.reset();
                    document.getElementById("transactionType").value = "expense";
                    document.querySelectorAll(".type-switch button").forEach(item => item.classList.toggle("active", item.dataset.type === "expense"));
                    document.getElementById("categoryField").hidden = false;
                    document.getElementById("category").required = true;
                    closeModal("transactionModal");



                if (commitTransaction(transaction)) {
                    event.target.reset();
                    document.getElementById("transactionType").value = "expense";
                    document.querySelectorAll(".type-switch button").forEach(item => item.classList.toggle("active", item.dataset.type === "expense"));
                    document.getElementById("categoryField").hidden = false;
                    document.getElementById("category").required = true;
                    closeModal("transactionModal");
                }


                }
            });
            document.getElementById("budgetForm").addEventListener("submit", event => {
                event.preventDefault();
                const amount = Number(document.getElementById("budgetInput").value);
                if (!Number.isFinite(amount) || amount <= 0 || amount > 999999999) {
                    showToast(t("budgetInvalid"));
                    return;
                }
                const key = monthKey(selectedMonth);
                const previous = data.budgets[key];
                const previousAlerts = data.budgetAlerts.slice();
                const spent = data.transactions
                    .filter(item => item.type === "expense" && item.date.slice(0, 7) === key)
                    .reduce((sum, item) => sum + item.amount, 0);
                const previousPercentage = previous > 0 ? spent / previous * 100 : 0;
                data.budgets[key] = Math.round(amount * 100) / 100;
                const triggeredBudgetAlerts = collectBudgetAlerts(key, previousPercentage, spent / data.budgets[key] * 100);
                if (saveData()) {
                    const notificationsSaved = triggeredBudgetAlerts
                        .map(threshold => addNotification(threshold >= 100 ? "budget100" : "budget80"))
                        .every(Boolean);
                    closeModal("budgetModal");
                    render();
                    showToast(!notificationsSaved
                        ? t("notificationSaveError")
                        : triggeredBudgetAlerts.length
                        ? t(triggeredBudgetAlerts[triggeredBudgetAlerts.length - 1] >= 100 ? "budgetExceededAlert" : "budgetWarning")
                        : t("budgetSaved"));
                    playUiSound("success");
                } else if (previous === undefined) {
                    delete data.budgets[key];
                    data.budgetAlerts = previousAlerts;
                } else {
                    data.budgets[key] = previous;
                    data.budgetAlerts = previousAlerts;
                }
            });
            document.getElementById("typeFilter").addEventListener("change", event => {
                filterType = event.target.value;
                render();
            });
            document.querySelectorAll(".mobile-nav-link").forEach(link => {
                link.addEventListener("click", () => {
                    document.querySelectorAll(".mobile-nav-link").forEach(item => {
                        if (item === link) item.setAttribute("aria-current", "page");
                        else item.removeAttribute("aria-current");
                    });
                });
            });
            document.querySelectorAll("#trendPeriodSwitch [data-period]").forEach(button => {
                button.addEventListener("click", () => {
                    trendPeriod = button.dataset.period;
                    document.querySelectorAll("#trendPeriodSwitch [data-period]").forEach(item => {
                        const active = item.dataset.period === trendPeriod;
                        item.classList.toggle("active", active);
                        item.setAttribute("aria-pressed", String(active));
                    });
                    renderTrendChart();
                    playUiSound("navigate");
                });
            });
            document.getElementById("previousMonth").addEventListener("click", () => {
                selectedMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
                render();
                playUiSound("navigate");
            });
            document.getElementById("nextMonth").addEventListener("click", () => {
                selectedMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
                render();
                playUiSound("navigate");
            });

            document.getElementById("startExperience").addEventListener("click", () => {
                if (settings.sounds) playWelcomeSound();
                document.getElementById("welcomePanel").hidden = true;
                document.getElementById("loginForm").hidden = false;
                document.getElementById("loginEmail").focus();
            });
            document.getElementById("loginForm").addEventListener("submit", submitAccountForm);
            document.getElementById("toggleAccountMode").addEventListener("click", () => {
                accountMode = accountMode === "login" ? "register" : "login";
                document.getElementById("loginFeedback").hidden = true;
                updateAccountMode();
            });
            document.getElementById("togglePassword").addEventListener("click", event => {
                const password = document.getElementById("loginPassword");
                password.type = password.type === "password" ? "text" : "password";
                const visibilityKey = password.type === "password" ? "showPassword" : "hidePassword";
                event.currentTarget.textContent = t(visibilityKey);
                event.currentTarget.setAttribute("aria-label", t(visibilityKey));
            });
            document.getElementById("continueAsGuest").addEventListener("click", finishIntro);
            document.getElementById("backToWelcome").addEventListener("click", () => {
                document.getElementById("loginForm").hidden = true;
                document.getElementById("welcomePanel").hidden = false;
                document.getElementById("startExperience").focus();
            });
            applyLanguage();
            restoreStoredAccount();
            if (new URLSearchParams(window.location.search).has("debug")) debugger;
            if ("serviceWorker" in navigator && /^https?:$/.test(window.location.protocol)) {
                navigator.serviceWorker.register("./sw.js").catch(error => {
                    console.error("ØªØ¹Ø°Ø± ØªÙØ¹ÙŠÙ„ Ø§Ù„Ø¹Ù…Ù„ Ø¯ÙˆÙ† Ø§ØªØµØ§Ù„:", error);
                });
            }
        })();

const STATIC_FILES = new Map([
    ["/", ["index.html", "text/html; charset=utf-8"]],
    ["/index.html", ["index.html", "text/html; charset=utf-8"]],
    ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
    ["/style.css", ["style.css", "text/css; charset=utf-8"]],
    ["/logo.svg", ["logo.svg", "image/svg+xml"]],
    ["/manifest.webmanifest", ["manifest.webmanifest", "application/manifest+json; charset=utf-8"]],
    ["/sw.js", ["sw.js", "text/javascript; charset=utf-8"]],
    ["/robots.txt", ["robots.txt", "text/plain; charset=utf-8"]],
    ["/sitemap.xml", ["sitemap.xml", "application/xml; charset=utf-8"]]
]);
