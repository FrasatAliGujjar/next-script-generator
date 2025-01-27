-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "reg" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_reg_key" ON "student"("reg");
