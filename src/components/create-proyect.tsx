"use client";

import { useState } from "react";
import { createProyectAction } from "@/actions/create-pryect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export function CreateProyectDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const handleCreate = async () => {
    if (!name.trim() || !session?.user?.id) return;

    setLoading(true);
    try {
      const result = await createProyectAction(name, session.user.id);

      if (result.success) {
        setName("");
        setOpen(false);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error creating proyect:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="my-3" variant="outline">
          New Proyect
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Proyect</DialogTitle>
          <DialogDescription>Add a new proyect with a title</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Title</Label>
            <Input
              id="name"
              placeholder="My Proyect"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button onClick={handleCreate} disabled={loading || !name.trim()}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
