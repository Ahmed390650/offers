"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import React from "react";

// Supabase client

export default function DronesTable({ drones = [] }: { drones: any[] | null }) {
  const [data, setData] = React.useState(drones || []);
  const filteredDrones = (text: string) => {
    setData(
      drones.filter((drone) =>
        drone.drone_name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  return (
    <div>
      <Input
        type="text"
        onChange={(e) => filteredDrones(e.target.value)}
        className="max-w-lg mb-2"
        placeholder="ابحث عن درون بالاسم..."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Drone Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Primary Mission</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Max Range (km)</TableHead>
            <TableHead>Max Speed (km/h)</TableHead>
            <TableHead>Endurance (min)</TableHead>
            <TableHead>Max Altitude (m)</TableHead>
            <TableHead>Empty Wt (kg)</TableHead>
            <TableHead>Payload Wt (kg)</TableHead>
            <TableHead>Takeoff Wt (kg)</TableHead>
            <TableHead>Length (cm)</TableHead>
            <TableHead>Width (cm)</TableHead>
            <TableHead>Payload Type</TableHead>
            <TableHead>Motor Count</TableHead>
            <TableHead>Control Range (km)</TableHead>
            <TableHead>GPS Type</TableHead>
            <TableHead>INS Type</TableHead>
            <TableHead>Nav Accuracy (m)</TableHead>
            <TableHead>Anti GPS Jam</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((drone, i) => (
            <TableRow key={drone.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{drone.drone_name}</TableCell>
              <TableCell>{drone.company_name}</TableCell>
              <TableCell>{drone.primary_mission}</TableCell>
              <TableCell>{drone.drone_type}</TableCell>
              <TableCell>{drone.max_range_km}</TableCell>
              <TableCell>{drone.max_speed_kmh}</TableCell>
              <TableCell>{drone.endurance_min}</TableCell>
              <TableCell>{drone.max_altitude_m}</TableCell>
              <TableCell>{drone.empty_weight_kg}</TableCell>
              <TableCell>{drone.payload_weight_kg}</TableCell>
              <TableCell>{drone.takeoff_weight_kg}</TableCell>
              <TableCell>{drone.length_cm}</TableCell>
              <TableCell>{drone.width_cm}</TableCell>
              <TableCell>{drone.payload_type}</TableCell>
              <TableCell>{drone.motor_count}</TableCell>
              <TableCell>{drone.control_link_range_km}</TableCell>
              <TableCell>{drone.gps_type}</TableCell>
              <TableCell>{drone.ins_type}</TableCell>
              <TableCell>{drone.navigation_accuracy_m}</TableCell>
              <TableCell>{drone.anti_gps_jamming ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
