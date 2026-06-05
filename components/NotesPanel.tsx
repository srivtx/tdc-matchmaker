"use client";

import { useState } from "react";
import { CustomerProfile, MatchmakerNote } from "@/lib/types";
import { Plus, Trash2, MessageSquare, Send } from "lucide-react";

interface Props {
  customer: CustomerProfile;
  onNotesChange: (notes: MatchmakerNote[]) => void;
}

export function NotesPanel({ customer, onNotesChange }: Props) {
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: MatchmakerNote = {
      id: Math.random().toString(36).slice(2),
      text: newNote.trim(),
      timestamp: new Date().toISOString(),
    };
    onNotesChange([note, ...customer.notes]);
    setNewNote("");
  };

  return (
    <div className="block-elevated overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-neutral-950/30">
        <MessageSquare size={13} className="text-zinc-500" />
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Matchmaker Notes</span>
        {customer.notes.length > 0 && (
          <span className="text-[10px] font-mono text-zinc-600 ml-auto">{customer.notes.length}</span>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-b border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            placeholder="Add a note from your last call..."
            className="flex-1 bg-neutral-950 border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-rose-500/30 focus:outline-none focus:ring-1 focus:ring-rose-500/10 transition-all"
          />
          <button
            onClick={addNote}
            disabled={!newNote.trim()}
            className="hud-button-primary !px-3.5 !py-2.5 disabled:opacity-30 !rounded-lg"
          >
            <Send size={13} />
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="max-h-64 overflow-y-auto">
        {customer.notes.length === 0 ? (
          <div className="text-center py-8 px-4">
            <MessageSquare size={24} className="text-zinc-800 mx-auto mb-2" />
            <p className="text-xs text-zinc-600">No notes yet</p>
            <p className="text-[10px] text-zinc-700 mt-0.5">Add quick notes from meetings or calls</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {customer.notes.map((note) => (
              <div key={note.id} className="flex items-start gap-3 px-5 py-3.5 group hover:bg-white/[0.01] transition-colors">
                <div className="w-1 h-1 rounded-full bg-zinc-700 mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-300 leading-relaxed">{note.text}</p>
                  <p className="text-[10px] text-zinc-600 mt-1 font-mono">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onNotesChange(customer.notes.filter((n) => n.id !== note.id))}
                  className="p-1.5 text-zinc-700 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all rounded-md hover:bg-rose-950/30"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
