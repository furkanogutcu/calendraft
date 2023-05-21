/*
  Warnings:

  - A unique constraint covering the columns `[serviceId,startTime,endTime]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_serviceId_startTime_endTime_key" ON "Appointment"("serviceId", "startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");
