"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Scan,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Camera,
  Flashlight,
  RefreshCw,
  Search,
  Users,
  ShieldCheck,
  Zap,
  Volume2,
  Clock,
  Sparkles,
} from "lucide-react";
import { getStoredEvents } from "@/utils/eventStore";
import { EventItem } from "@/data/mockEvents";

interface ScanRecord {
  id: string;
  ticketNumber: string;
  attendeeName: string;
  category: string;
  timestamp: string;
  status: "SUCCESS" | "DUPLICATE" | "INVALID";
  gate: string;
}

export function QRScannerModule() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEventSlug, setSelectedEventSlug] = useState<string>("");
  const [manualCode, setManualCode] = useState("");
  const [scanningActive, setScanningActive] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");
  const [lastScanResult, setLastScanResult] = useState<ScanRecord | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([
    {
      id: "scan-1",
      ticketNumber: "UBBI-2026-9842",
      attendeeName: "Amadou Diallo",
      category: "VIP",
      timestamp: "20:14:05",
      status: "SUCCESS",
      gate: "Porte A — VIP",
    },
    {
      id: "scan-2",
      ticketNumber: "UBBI-2026-7712",
      attendeeName: "Fatou Sow",
      category: "STANDARD",
      timestamp: "20:12:30",
      status: "SUCCESS",
      gate: "Porte A — VIP",
    },
    {
      id: "scan-3",
      ticketNumber: "UBBI-2026-3390",
      attendeeName: "Omar Ndiaye",
      category: "VIP",
      timestamp: "20:10:15",
      status: "DUPLICATE",
      gate: "Porte B — Standard",
    },
  ]);

  const [stats, setStats] = useState({
    totalScanned: 842,
    totalTickets: 1200,
    validScans: 839,
    duplicates: 3,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasWebcam, setHasWebcam] = useState(false);

  useEffect(() => {
    const loadedEvents = getStoredEvents();
    setEvents(loadedEvents);
    if (loadedEvents.length > 0) {
      setSelectedEventSlug(loadedEvents[0].slug);
    }
  }, []);

  // Request actual camera feed if supported
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraFacing },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setHasWebcam(true);
        }
      }
    } catch (err) {
      console.log("Caméra physique indisponible, mode simulation actif.", err);
      setHasWebcam(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraFacing]);

  const activeEvent = events.find((e) => e.slug === selectedEventSlug) || events[0];

  const processScan = (code: string, forceResult?: "SUCCESS" | "DUPLICATE" | "INVALID") => {
    const cleanCode = code.trim().toUpperCase() || `UBBI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    let status: "SUCCESS" | "DUPLICATE" | "INVALID" = forceResult || "SUCCESS";

    if (!forceResult) {
      if (cleanCode.includes("DUP") || cleanCode === "UBBI-DUPLICATE") {
        status = "DUPLICATE";
      } else if (cleanCode.includes("INV") || cleanCode === "UBBI-INVALID") {
        status = "INVALID";
      }
    }

    const sampleNames = ["Mariama Ba", "Ibrahima Fall", "Awa Seck", "Ousmane Diagne", "Khadija Faye"];
    const name = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const category = activeEvent?.tickets?.[0]?.name || "STANDARD";

    const newRecord: ScanRecord = {
      id: `scan-${Date.now()}`,
      ticketNumber: cleanCode,
      attendeeName: name,
      category,
      timestamp: timeStr,
      status,
      gate: "Porte A — VIP",
    };

    setLastScanResult(newRecord);
    setScanHistory((prev) => [newRecord, ...prev.slice(0, 9)]);

    if (status === "SUCCESS") {
      setStats((prev) => ({
        ...prev,
        totalScanned: prev.totalScanned + 1,
        validScans: prev.validScans + 1,
      }));
    } else if (status === "DUPLICATE") {
      setStats((prev) => ({
        ...prev,
        duplicates: prev.duplicates + 1,
      }));
    }

    setManualCode("");
  };

  const percentage = Math.round((stats.totalScanned / stats.totalTickets) * 100);

  return (
    <div className="space-y-6 text-[#111326]">
      {/* Top Header & Event Switcher Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E4ED] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#2A1464] text-white text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#009FEF]" />
              Scanner Contrôle d'Accès Ubbi
            </span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Scanner en direct
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111326] mt-1">
            {activeEvent?.title || "Contrôle des Billets à la Porte"}
          </h2>
        </div>

        {/* Event Dropdown Selector */}
        <div className="w-full sm:w-auto">
          <label className="block text-[11px] font-bold text-[#666A80] mb-1">
            Événement actif en contrôle :
          </label>
          <select
            value={selectedEventSlug}
            onChange={(e) => setSelectedEventSlug(e.target.value)}
            className="w-full sm:w-64 bg-[#F7F7FA] border border-[#E2E4ED] text-[#111326] font-bold text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#009FEF]"
          >
            {events.map((evt) => (
              <option key={evt.id} value={evt.slug}>
                {evt.title} ({evt.venue})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Scan KPI Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#E2E4ED] shadow-xs">
          <span className="text-[10px] font-bold text-[#666A80] uppercase tracking-wider block">
            Entrées Validées
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#2A1464]">{stats.validScans}</span>
            <span className="text-xs text-[#666A80]">/ {stats.totalTickets}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E2E4ED] shadow-xs">
          <span className="text-[10px] font-bold text-[#666A80] uppercase tracking-wider block">
            Taux de Remplissage
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#009FEF]">{percentage}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E2E4ED] shadow-xs">
          <span className="text-[10px] font-bold text-[#666A80] uppercase tracking-wider block">
            Doublons / Refus
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-rose-600">{stats.duplicates}</span>
            <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full">
              Alertes
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#E2E4ED] shadow-xs">
          <span className="text-[10px] font-bold text-[#666A80] uppercase tracking-wider block">
            Porte d'accès
          </span>
          <div className="mt-1">
            <span className="text-xs font-bold text-[#111326] block">Porte A — VIP</span>
            <span className="text-[11px] text-[#666A80]">Agent #04 (Moussa D.)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Scanner Viewfinder & Live History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive QR Scanner Camera Frame (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#111326] rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden text-white">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Scan className="w-5 h-5 text-[#009FEF] animate-spin" />
                <h3 className="font-bold text-sm text-white">Viseur Optique QR Code</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFlashOn(!flashOn)}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                    flashOn
                      ? "bg-amber-400 text-black border-amber-300 shadow-md"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                  title="Activer le Flash"
                >
                  <Flashlight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCameraFacing(cameraFacing === "environment" ? "user" : "environment")
                  }
                  className="p-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-xl text-xs font-bold transition-all"
                  title="Pivoter la caméra"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewfinder Box */}
            <div className="relative w-full aspect-square max-w-sm mx-auto bg-black rounded-2xl overflow-hidden border-2 border-[#009FEF]/60 flex items-center justify-center shadow-inner group">
              {/* Actual Video Element or Simulated Grid */}
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover ${hasWebcam ? "block" : "hidden"}`}
              />

              {!hasWebcam && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#190262]/80 to-[#0A0331] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-3 backdrop-blur-md">
                    <Camera className="w-10 h-10 text-[#009FEF]" />
                  </div>
                  <p className="text-xs font-bold text-white">Caméra en attente de billet</p>
                  <p className="text-[11px] text-white/60 mt-1 max-w-xs">
                    Placez le QR Code du billet devant la caméra pour déclencher le scan automatique.
                  </p>
                </div>
              )}

              {/* Animated Laser Beam */}
              <div className="absolute inset-x-4 top-1/2 h-0.5 bg-[#009FEF] shadow-[0_0_15px_#009FEF] animate-pulse z-20" />
              <div className="absolute inset-x-8 top-1/3 bottom-1/3 border-2 border-dashed border-[#009FEF]/50 rounded-xl z-20 pointer-events-none" />

              {/* Corner Frame Markers */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-[#009FEF] rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-[#009FEF] rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-[#009FEF] rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-[#009FEF] rounded-br-lg" />
            </div>

            {/* Quick Simulation Buttons */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-bold text-white/70 block text-center">
                Simulateur de Scan Rapide pour Démonstration :
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => processScan("UBBI-2026-9842", "SUCCESS")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Scan Valide</span>
                </button>

                <button
                  type="button"
                  onClick={() => processScan("UBBI-DUPLICATE", "DUPLICATE")}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Billet Déjà Utilisé</span>
                </button>

                <button
                  type="button"
                  onClick={() => processScan("UBBI-INVALID", "INVALID")}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Code Invalide</span>
                </button>
              </div>
            </div>
          </div>

          {/* Manual Input Fallback */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E4ED] shadow-xs">
            <label className="block text-xs font-bold text-[#111326] mb-1.5">
              Saisie Manuelle du Code Billet (En cas de problème d'écran) :
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (manualCode) processScan(manualCode);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ex: UBBI-2026-9842"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 bg-[#F7F7FA] border border-[#E2E4ED] rounded-xl px-4 py-2.5 text-xs font-bold text-[#111326] uppercase outline-none focus:border-[#009FEF]"
              />
              <button
                type="submit"
                className="bg-[#2A1464] hover:bg-[#1F0D4F] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
              >
                Valider
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Scan Result Popup Card & Recent Scans History (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Scan Result Screen */}
          {lastScanResult ? (
            <div
              className={`rounded-3xl p-6 border shadow-xl transition-all ${
                lastScanResult.status === "SUCCESS"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                  : lastScanResult.status === "DUPLICATE"
                  ? "bg-rose-50 border-rose-300 text-rose-950"
                  : "bg-amber-50 border-amber-300 text-amber-950"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-current/20">
                <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Résultat du Scan ({lastScanResult.timestamp})
                </span>
                <button
                  onClick={() => setLastScanResult(null)}
                  className="text-xs font-bold opacity-60 hover:opacity-100"
                >
                  ✕ Fermer
                </button>
              </div>

              <div className="mt-4 text-center space-y-3">
                {lastScanResult.status === "SUCCESS" && (
                  <>
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-emerald-800">ENTRÉE AUTORISÉE</h3>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">
                        Billet Officiel Conforme ✓
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-emerald-200 text-left space-y-1.5 text-xs text-[#111326]">
                      <div className="flex justify-between">
                        <span className="text-[#666A80]">Titulaire :</span>
                        <span className="font-extrabold">{lastScanResult.attendeeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666A80]">Pass :</span>
                        <span className="font-extrabold text-[#009FEF] bg-[#E5F6FF] px-2 py-0.5 rounded">
                          {lastScanResult.category}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666A80]">Réf Billet :</span>
                        <span className="font-mono font-bold">{lastScanResult.ticketNumber}</span>
                      </div>
                    </div>
                  </>
                )}

                {lastScanResult.status === "DUPLICATE" && (
                  <>
                    <div className="w-16 h-16 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <AlertTriangle className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-rose-800">ACCÈS REFUSÉ — DÉJÀ SCANNE</h3>
                      <p className="text-xs font-bold text-rose-700 mt-0.5">
                        Attention : Ce billet a déjà franchi la porte d'entrée !
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-rose-200 text-left space-y-1.5 text-xs text-[#111326]">
                      <div className="flex justify-between">
                        <span className="text-[#666A80]">Premier Scan :</span>
                        <span className="font-bold text-rose-600">Aujourd'hui à 19:45 (Porte B)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666A80]">Titulaire d'origine :</span>
                        <span className="font-extrabold">{lastScanResult.attendeeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666A80]">Réf Billet :</span>
                        <span className="font-mono font-bold">{lastScanResult.ticketNumber}</span>
                      </div>
                    </div>
                  </>
                )}

                {lastScanResult.status === "INVALID" && (
                  <>
                    <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <XCircle className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-amber-900">BILLET NON VALIDE</h3>
                      <p className="text-xs font-bold text-amber-800 mt-0.5">
                        Code non reconnu ou événement incorrect.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-[#E2E4ED] text-center shadow-xs space-y-3">
              <div className="w-12 h-12 bg-[#E5F6FF] text-[#009FEF] rounded-2xl flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#111326]">Scanner Prêt pour le Prochain Billet</h3>
              <p className="text-xs text-[#666A80] max-w-xs mx-auto">
                Scannez le QR Code d'un participant ou utilisez les boutons de démonstration à gauche pour afficher le résultat d'accès.
              </p>
            </div>
          )}

          {/* Recent Scans Journal */}
          <div className="bg-white rounded-3xl p-5 border border-[#E2E4ED] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E4ED] pb-3">
              <h3 className="font-bold text-sm text-[#111326] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#009FEF]" />
                Journal des Derniers Scans
              </h3>
              <span className="text-[11px] font-bold text-[#666A80]">En direct</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {scanHistory.map((scan) => (
                <div
                  key={scan.id}
                  className="p-3 rounded-xl bg-[#F7F7FA] border border-[#E2E4ED] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#111326]">
                      <span>{scan.attendeeName}</span>
                      <span className="text-[10px] bg-[#2A1464] text-white px-2 py-0.2 rounded-md">
                        {scan.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#666A80] font-mono">
                      {scan.ticketNumber} • {scan.gate}
                    </div>
                  </div>

                  <div className="text-right">
                    {scan.status === "SUCCESS" && (
                      <span className="bg-emerald-100 text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full inline-block">
                        VALIDÉ ✓
                      </span>
                    )}
                    {scan.status === "DUPLICATE" && (
                      <span className="bg-rose-100 text-rose-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full inline-block">
                        DOUBLON ⚠️
                      </span>
                    )}
                    {scan.status === "INVALID" && (
                      <span className="bg-amber-100 text-amber-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full inline-block">
                        INVALIDE ✕
                      </span>
                    )}
                    <span className="text-[10px] text-[#666A80] block mt-0.5 font-semibold">
                      {scan.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
