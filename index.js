// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  carbonCredits;
  portfolioItems;
  orders;
  contactRequests;
  currentUserId;
  currentCreditId;
  currentPortfolioId;
  currentOrderId;
  currentContactId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.carbonCredits = /* @__PURE__ */ new Map();
    this.portfolioItems = /* @__PURE__ */ new Map();
    this.orders = /* @__PURE__ */ new Map();
    this.contactRequests = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentCreditId = 1;
    this.currentPortfolioId = 1;
    this.currentOrderId = 1;
    this.currentContactId = 1;
    this.initializeSampleData();
  }
  initializeSampleData() {
    const sampleCredits = [
      {
        id: this.currentCreditId++,
        name: "Amazon Rainforest Protection",
        description: "Protecting 50,000 hectares of Amazon rainforest through community conservation initiatives",
        type: "Forestry",
        location: "Brazil",
        verification: "VCS Verified",
        price: "45.00",
        available: 12500,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 1,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: this.currentCreditId++,
        name: "Solar Farm India",
        description: "100MW solar installation providing clean energy to rural communities",
        type: "Solar Energy",
        location: "India",
        verification: "Gold Standard",
        price: "38.00",
        available: 8200,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 2,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: this.currentCreditId++,
        name: "Offshore Wind Farm",
        description: "250MW offshore wind installation generating clean electricity",
        type: "Wind Energy",
        location: "Denmark",
        verification: "VCS Verified",
        price: "52.00",
        available: 15750,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 3,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: this.currentCreditId++,
        name: "Methane Capture Project",
        description: "Capturing methane emissions from agricultural waste and converting to energy",
        type: "Methane Reduction",
        location: "United States",
        verification: "VCS Verified",
        price: "42.00",
        available: 9800,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 4,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: this.currentCreditId++,
        name: "Reforestation Kenya",
        description: "Large-scale tree planting initiative restoring degraded forest land",
        type: "Forestry",
        location: "Kenya",
        verification: "Gold Standard",
        price: "35.00",
        available: 18600,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1574263867128-f5d55a4fa68b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 5,
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: this.currentCreditId++,
        name: "Hydroelectric Power",
        description: "Small-scale hydroelectric project providing clean energy to remote communities",
        type: "Hydro Energy",
        location: "Costa Rica",
        verification: "VCS Verified",
        price: "41.00",
        available: 6750,
        vintage: 2023,
        imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        sellerId: 6,
        createdAt: /* @__PURE__ */ new Date()
      }
    ];
    sampleCredits.forEach((credit) => {
      this.carbonCredits.set(credit.id, credit);
    });
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Carbon Credit methods
  async getCarbonCredits() {
    return Array.from(this.carbonCredits.values());
  }
  async getCarbonCredit(id) {
    return this.carbonCredits.get(id);
  }
  async createCarbonCredit(insertCredit) {
    const id = this.currentCreditId++;
    const credit = {
      ...insertCredit,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.carbonCredits.set(id, credit);
    return credit;
  }
  async updateCarbonCredit(id, updates) {
    const existing = this.carbonCredits.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updates };
    this.carbonCredits.set(id, updated);
    return updated;
  }
  // Portfolio methods
  async getPortfolioItems(userId) {
    return Array.from(this.portfolioItems.values()).filter((item) => item.userId === userId);
  }
  async createPortfolioItem(insertItem) {
    const id = this.currentPortfolioId++;
    const item = {
      ...insertItem,
      id,
      purchaseDate: /* @__PURE__ */ new Date()
    };
    this.portfolioItems.set(id, item);
    return item;
  }
  // Order methods
  async getOrders(userId) {
    return Array.from(this.orders.values()).filter((order) => order.userId === userId);
  }
  async createOrder(insertOrder) {
    const id = this.currentOrderId++;
    const deliveryDate = /* @__PURE__ */ new Date();
    switch (insertOrder.duration) {
      case "immediate":
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        break;
      case "1-year":
        deliveryDate.setFullYear(deliveryDate.getFullYear() + 1);
        break;
      case "2-year":
        deliveryDate.setFullYear(deliveryDate.getFullYear() + 2);
        break;
      case "5-year":
        deliveryDate.setFullYear(deliveryDate.getFullYear() + 5);
        break;
      case "10-year":
        deliveryDate.setFullYear(deliveryDate.getFullYear() + 10);
        break;
      default:
        deliveryDate.setDate(deliveryDate.getDate() + 7);
    }
    const order = {
      ...insertOrder,
      id,
      status: "pending",
      deliveryDate,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.orders.set(id, order);
    return order;
  }
  async updateOrderStatus(id, status) {
    const existing = this.orders.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, status };
    this.orders.set(id, updated);
    return updated;
  }
  // Contact Request methods
  async createContactRequest(insertRequest) {
    const id = this.currentContactId++;
    const request = {
      ...insertRequest,
      id,
      company: insertRequest.company || null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactRequests.set(id, request);
    return request;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var carbonCredits = pgTable("carbon_credits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  // Forestry, Solar Energy, Wind Energy, etc.
  location: text("location").notNull(),
  verification: text("verification").notNull(),
  // VCS Verified, Gold Standard, etc.
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  available: integer("available").notNull(),
  vintage: integer("vintage").notNull(),
  imageUrl: text("image_url").notNull(),
  sellerId: integer("seller_id").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  creditId: integer("credit_id").notNull(),
  quantity: integer("quantity").notNull(),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }).notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow()
});
var orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  creditId: integer("credit_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  duration: text("duration").notNull(),
  // immediate, 1-year, 2-year, 5-year, 10-year
  deliveryDate: timestamp("delivery_date"),
  status: text("status").notNull().default("pending"),
  // pending, confirmed, processing, delivered, cancelled
  createdAt: timestamp("created_at").defaultNow()
});
var contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertCarbonCreditSchema = createInsertSchema(carbonCredits).omit({
  id: true,
  createdAt: true
});
var insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
  purchaseDate: true
});
var insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  status: true,
  deliveryDate: true
});
var insertContactRequestSchema = createInsertSchema(contactRequests).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/carbon-credits", async (req, res) => {
    try {
      const credits = await storage.getCarbonCredits();
      res.json(credits);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch carbon credits" });
    }
  });
  app2.get("/api/carbon-credits/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const credit = await storage.getCarbonCredit(id);
      if (!credit) {
        return res.status(404).json({ error: "Carbon credit not found" });
      }
      res.json(credit);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch carbon credit" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const validatedOrder = insertOrderSchema.parse(req.body);
      const credit = await storage.getCarbonCredit(validatedOrder.creditId);
      if (!credit) {
        return res.status(404).json({ error: "Carbon credit not found" });
      }
      if (credit.available < validatedOrder.quantity) {
        return res.status(400).json({
          error: "Insufficient credits available",
          available: credit.available
        });
      }
      const order = await storage.createOrder(validatedOrder);
      await storage.updateCarbonCredit(validatedOrder.creditId, {
        available: credit.available - validatedOrder.quantity
      });
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid order data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create order" });
    }
  });
  app2.get("/api/orders", async (req, res) => {
    try {
      const orders2 = await storage.getOrders(1);
      res.json(orders2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });
  app2.get("/api/portfolio", async (req, res) => {
    try {
      const portfolioItems2 = await storage.getPortfolioItems(1);
      res.json(portfolioItems2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedRequest = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validatedRequest);
      res.status(201).json({ message: "Contact request submitted successfully", id: contactRequest.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to submit contact request" });
    }
  });
  app2.get("/api/market-stats", async (req, res) => {
    try {
      const credits = await storage.getCarbonCredits();
      const totalCredits = credits.reduce((sum, credit) => sum + credit.available, 0);
      const totalOffset = Math.floor(totalCredits * 0.36);
      const stats = {
        totalCredits: `${(totalCredits / 1e6).toFixed(1)}M`,
        activeBuyers: "15,200",
        verifiedSellers: "3,840",
        carbonOffset: `${(totalOffset / 1e3).toFixed(0)}K`
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch market stats" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "../dist");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
