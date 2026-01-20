// Prisma v7 config file
import "dotenv/config";

export default {
  datasource: {
    url: process.env.DATABASE_URL,
  },
  schema: "prisma/schema.prisma",
};
