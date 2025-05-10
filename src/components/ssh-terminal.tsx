"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import type { VM } from "@/core/vm/vm.type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { useReadVM } from "@/core/vm/vm.query";
import { useAlert } from "./modal/alert/alert-modal-provider";

interface SSHTerminalProps {
  vmId: string;
  onClose: () => void;
}

export function SSHTerminal({ vmId, onClose }: SSHTerminalProps) {
  const { data: vm } = useReadVM(vmId);
  const [isConnected, setIsConnected] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { showAlert } = useAlert();

  useEffect(() => {
	const ip = "192.168.1.1"
	
	showAlert({
		title: "Feature soon",
		description: `Please connect to the VM via the SSH client\n ssh root@${ip}`,
		type: "warning",
		primaryAction: {
		  label: "Fine",
		  onClick: () => console.log("Success action clicked"),
		},
	  });

    // Simulate SSH connection
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!vm) {
    return <div>VM not found</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>SSH Terminal - {vm.name}</CardTitle>
        <Button variant="outline" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div
          ref={terminalRef}
          className="bg-black text-green-400 font-mono p-4 rounded-md h-[400px] overflow-y-auto"
        >
          {!isConnected ? (
            <div>Connecting to {vm.name}...</div>
          ) : (
            <div>
              <div>Connected to {vm.name}</div>
              <div>Operating System: {vm.os}</div>
              <div>CPU: {vm.cpu} cores</div>
              <div>RAM: {vm.ram} GB</div>
              <div>Storage: {vm.storage} GB</div>
              <div className="mt-4">$ _</div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <div className="text-sm text-muted-foreground">
          {isConnected
            ? "Connected to SSH terminal"
            : "Establishing SSH connection..."}
        </div>
        <Button variant="outline" onClick={onClose}>
          Close Terminal
        </Button>
      </CardFooter>
    </Card>
  );
}
