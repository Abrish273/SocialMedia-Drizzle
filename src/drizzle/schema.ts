import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  uuid,
  pgEnum,
  index,
  unique,
  boolean,
  timestamp,
  real,
  primaryKey,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"]);
export const UserTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: varchar("age").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    role: UserRole("UserRole").notNull().default("BASIC"),
  },
  (table) => {
    return {
      // u can use uniqueIndex if the email is unique
      emailIndex: index("emailIndex").on(table.email),
      uniqueNameAndAge: unique("uniqueNameAndAge").on(table.name, table.age),
    };
  }
);

// one to one relationship between user and userPreferences
export const UserPreferencesTable = pgTable("userPreferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailUpdates: boolean("emailUpdates").notNull().default(false),
  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(),
});

// one to many relationship between user and post
export const PostTable = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  averageRating: real("averageRating").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  authorId: uuid("authorId")
    .references(() => UserTable.id)
    .notNull(),
});

//  one to many relationship between post and comment
export const CategoryTable = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

// postCategory table is the join table
// many to many relationship between post and category
export const PostCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postId")
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => CategoryTable.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  }
);

// RELATIONS

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    preferences: one(UserPreferencesTable),
    posts: many(PostTable),
  };
});

export const UserPreferencesTableRelations = relations(
  UserPreferencesTable,
  ({ one }) => {
    return {
      user: one(UserTable, {
        fields: [UserPreferencesTable.userId],
        references: [UserTable.id],
      }),
    };
  }
);

export const PostTableRelations = relations(PostTable, ({ one, many }) => {
  return {
    author: one(UserTable, {
      fields: [PostTable.authorId],
      references: [UserTable.id],
    }),
    PostCategories: many(PostCategoryTable),
  };
});

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => {
  return {
    PostCategories: many(PostCategoryTable),
  };
});

export const PostCategoryTableRelations = relations(PostCategoryTable, ({ one }) => {
  return {
    post: one(PostTable, {
      fields: [PostCategoryTable.postId],
      references: [PostTable.id],
    }),
    category: one(CategoryTable, {
      fields: [PostCategoryTable.categoryId],
      references: [CategoryTable.id],
    }),
  };
});
