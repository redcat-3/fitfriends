-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('yoga', 'running', 'boxing', 'stretching', 'crossfit', 'aerobics', 'pilates');

-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('beginner', 'ethusiast', 'pro');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('male', 'female', 'indifferent');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('visa', 'mir', 'umoney');

-- CreateTable
CREATE TABLE "workouts" (
    "workout_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "level" "UserLevel" NOT NULL,
    "type" "WorkoutType" NOT NULL,
    "time_of_training" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "calories_to_spend" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" "UserGender" NOT NULL,
    "video" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "coach_id" TEXT NOT NULL,
    "special" BOOLEAN NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("workout_id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "feedback_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "orderType" TEXT NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "order_price" INTEGER NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("workout_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("workout_id") ON DELETE CASCADE ON UPDATE CASCADE;
