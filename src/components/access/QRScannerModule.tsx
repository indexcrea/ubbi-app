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
  Lock,
  Share2,
  Copy,
  Check,
  Smartphone,
} from "lucide-react";
import { getStoredEvents } from "@/utils/eventStore";
import { EventItem } from "@/data/mockEvents";
import { getScanLockStatus, setScanLockStatus, getAgentScanLink } from "@/utils/scanLockStore";

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
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");
  const [lastScanResult, setLastScanResult] = useState<ScanRecord | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([]);
  const [stats, setStats] = useState({
    totalScanned: 0,
    totalTickets: 100,
    validScans: 0,
    duplicates: 0,
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
        setCameraError("La caméra n'est pas disponible sur cet appareil.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacing },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Accès caméra refusé. Veuillez autoriser la caméra dans votre navigateur.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    const loadedEvents = getStoredEvents();
    setEvents(loadedEvents);
    
    // Read query param if passed (?event=slug or ?id=id)
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const urlEvent = searchParams.get("event") || searchParams.get("id");
      if (urlEvent) {
        const found = loadedEvents.find((e) => e.slug === urlEvent || e.id === urlEvent);
        if (found) {
          setSelectedEventSlug(found.slug);
          setIsLocked(getScanLockStatus(found.slug));

          const capacity = (found as any).capacity || 500;
          const ticketsSold = (found as any).ticketsSold || (found.tickets ? 15 : 0);
          setStats({
            totalScanned: 0,
            totalTickets: capacity,
            validScans: 0,
            duplicates: 0,
          });
          return;
        }
      }
    }

    if (loadedEvents.length > 0) {
      const first = loadedEvents[0];
      setSelectedEventSlug(first.slug);
      setIsLocked(getScanLockStatus(first.slug));
      const capacity = (first as any).capacity || 500;
      setStats({
        totalScanned: 0,
        totalTickets: capacity,
        validScans: 0,
        duplicates: 0,
      });
    }

    // Auto start camera if available
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const handleEventChange = (slug: string) => {
    setSelectedEventSlug(slug);
    setIsLocked(getScanLockStatus(slug));

    const found = events.find((e) => e.slug === slug);
    if (found) {
      const capacity = (found as any).capacity || 500;
      setStats({
        totalScanned: 0,
        totalTickets: capacity,
        validScans: 0,
        duplicates: 0,
      });
    }
  };

  const toggleLockState = () => {
    const nextState = !isLocked;
    setIsLocked(nextState);
    if (selectedEventSlug) {
      setScanLockStatus(selectedEventSlug, nextState);
    }
  };

  const handleCopyLink = () => {
    if (!selectedEventSlug) return;
    const link = getAgentScanLink(selectedEventSlug);
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const processScan = (codeToTest: string) => {
    if (isLocked) return;

    const trimmed = codeToTest.trim().toUpperCase();
    if (!trimmed) return;

    const isDuplicate = scanHistory.some((s) => s.ticketNumber === trimmed && s.status === "SUCCESS");

    const newRecord: ScanRecord = {
      id: `scan-${Date.now()}`,
      ticketNumber: trimmed.startsWith("UBBI-") ? trimmed : `UBBI-2026-${trimmed.slice(-4) || "8821"}`,
      attendeeName: "Participant Scanné",
      category: trimmed.includes("VIP") ? "VIP" : "STANDARD",
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      status: isDuplicate ? "DUPLICATE" : "SUCCESS",
      gate: "Smartphone Contrôleur",
    };

    setLastScanResult(newRecord);
    setScanHistory((prev) => [newRecord, ...prev]);

    setStats((prev) => ({
      ...prev,
      totalScanned: prev.totalScanned + 1,
      validScans: isDuplicate ? prev.validScans : prev.validScans + 1,
      duplicates: isDuplicate ? prev.duplicates + 1 : prev.duplicates,
    }));

    setManualCode("");
  };

  const selectedEvent = events.find((e) => e.slug === selectedEventSlug);

  return (
    <div className="space-y-6">
      {/* 1. Header Control Bar & Lock Switch */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#E5F6FF] text-[#009FEF] text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Module Web de Contrôle Porte
            </span>
            <span className="bg-[#F7F7FA] text-[#666A80] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#E2E4ED]">
              Sans application mobile
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#111326]">
            {selectedEvent ? selectedEvent.title : "Scanner de Billets"}
          </h2>
          <p className="text-xs text-[#666A80] mt-0.5">
            Validez les entrées depuis votre smartphone ou partagez le lien sécurisé avec vos contrôleurs.
          </p>
        </div>

        {/* Action Controls & Lock Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Lock / Unlock Toggle Button */}
          <button
            onClick={toggleLockState}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all ${
              isLocked
                ? "bg-[#FFEBEB] text-[#E52E2E] border border-[#FFC2C2] hover:bg-[#FFD6D6]"
                : "bg-[#E6F8F0] text-[#00A86B] border border-[#B3EBD3] hover:bg-[#D1F3E4]"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{isLocked ? "Scans Verrouillés (Portes fermées)" : "Scans Actifs (Portes Ouvertes)"}</span>
          </button>

          {/* Copy Secure Agent Share Link */}
          <button
            onClick={handleCopyLink}
            className="bg-[#2A1464] hover:bg-[#1E0D4B] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-colors"
            title="Copier le lien sécurisé pour vos 1 à 3 agents à la porte"
          >
            {copiedLink ? <Check className="w-4 h-4 text-[#009FEF]" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? "Lien Copié !" : "Partager lien aux agents (1 à 3 phones)"}</span>
          </button>
        </div>
      </div>

      {/* If Event Scans are Locked by Organizer */}
      {isLocked ? (
        <div className="bg-[#FFEBEB] border-2 border-[#FFC2C2] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-lg animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 bg-[#E52E2E] text-white rounded-3xl flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-10 h-10" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-[#991B1B]">
              Contrôle d'Accès Verrouillé
            </h3>
            <p className="text-xs sm:text-sm text-[#7F1D1D] leading-relaxed">
              L'organisateur a fermé le scannage des billets pour cet événement. Les accès sont temporairement bloqués.
            </p>
          </div>
          <button
            onClick={toggleLockState}
            className="inline-flex items-center gap-2 bg-[#E52E2E] text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-md hover:bg-[#C92020] transition-colors mt-2"
          >
            <span>Déverrouiller les Scans de Porte</span>
          </button>
        </div>
      ) : (
        <>
          {/* Live Real-time Scan Statistics Counter */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Scanned */}
            <div className="bg-white rounded-2xl p-5 border border-white/60 shadow-md">
              <div className="flex items-center justify-between text-[#666A80] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Billets Scannés</span>
                <Users className="w-5 h-5 text-[#009FEF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#111326]">
                {stats.totalScanned} <span className="text-xs font-normal text-[#666A80]">/ {stats.totalTickets}</span>
              </div>
              <div className="w-full bg-[#F7F7FA] h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#009FEF] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (stats.totalScanned / stats.totalTickets) * 100)}%` }}
                />
              </div>
            </div>

            {/* Valid Scans */}
            <div className="bg-white rounded-2xl p-5 border border-white/60 shadow-md">
              <div className="flex items-center justify-between text-[#666A80] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Entrées Valides</span>
                <CheckCircle2 className="w-5 h-5 text-[#00A86B]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00A86B]">
                {stats.validScans}
              </div>
              <p className="text-[11px] text-[#666A80] mt-2">Accès autorisés en salle</p>
            </div>

            {/* Duplicates Refused */}
            <div className="bg-white rounded-2xl p-5 border border-white/60 shadow-md">
              <div className="flex items-center justify-between text-[#666A80] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Doublons Refusés</span>
                <XCircle className="w-5 h-5 text-[#E52E2E]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E52E2E]">
                {stats.duplicates}
              </div>
              <p className="text-[11px] text-[#666A80] mt-2">Tentatives de réutilisation</p>
            </div>

            {/* Smartphone Agents Active */}
            <div className="bg-white rounded-2xl p-5 border border-white/60 shadow-md">
              <div className="flex items-center justify-between text-[#666A80] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Smartphones Agents</span>
                <Smartphone className="w-5 h-5 text-[#2A1464]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#2A1464]">
                3 <span className="text-xs font-normal text-[#666A80]">max actifs</span>
              </div>
              <p className="text-[11px] text-[#00A86B] font-semibold mt-2">● Synchronisation en direct</p>
            </div>
          </div>

          {/* Main Viewfinder & Input Scanner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Camera Viewfinder Container */}
            <div className="lg:col-span-7 bg-[#0a0331] rounded-3xl p-6 text-white shadow-2xl border border-white/10 flex flex-col justify-between min-h-[420px] relative overflow-hidden">
              {/* Background live video stream */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  cameraActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Dark overlay backdrop over video */}
              <div className="absolute inset-0 bg-[#0a0331]/40 pointer-events-none" />

              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cameraActive ? "bg-[#00A86B]" : "bg-amber-400"} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${cameraActive ? "bg-[#00A86B]" : "bg-amber-400"}`}></span>
                  </span>
                  <span className="text-xs font-extrabold tracking-wide uppercase">
                    {cameraActive ? "Caméra Smartphone Active en Direct" : "Viseur Caméra Smartphone"}
                  </span>
                </div>

                {/* Camera control button */}
                <button
                  onClick={cameraActive ? stopCamera : startCamera}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-[#009FEF]" />
                  <span>{cameraActive ? "Arrêter Caméra" : "Activer Caméra"}</span>
                </button>
              </div>

              {/* Viewfinder Frame with Laser Scan Bar */}
              <div className="relative z-10 my-8 mx-auto w-64 h-64 sm:w-72 sm:h-72 border-2 border-dashed border-[#009FEF] rounded-3xl flex items-center justify-center bg-black/40 backdrop-blur-xs overflow-hidden shadow-2xl">
                <div className="w-full h-1 bg-[#009FEF] absolute shadow-[0_0_20px_#009FEF] animate-pulse top-1/2 -translate-y-1/2 z-20" />

                {!cameraActive ? (
                  <div className="text-center p-4 z-10 space-y-3">
                    <Camera className="w-14 h-14 text-[#009FEF] mx-auto animate-bounce" />
                    <p className="text-xs font-semibold text-slate-200">
                      {cameraError || "Autorisez l'accès à la caméra pour scanner les QR Codes en direct"}
                    </p>
                    <button
                      onClick={startCamera}
                      className="bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all inline-block"
                    >
                      Ouvrir la Caméra 📷
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-4 z-10">
                    <Scan className="w-12 h-12 text-[#009FEF]/80 mx-auto animate-pulse mb-2" />
                    <p className="text-[11px] font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md inline-block">
                      Scannage automatique des QR Codes en cours...
                    </p>
                  </div>
                )}
              </div>

              {/* Instant Scan Validation Banner Feedback */}
              {lastScanResult && (
                <div
                  className={`relative z-10 p-4 rounded-2xl text-center font-bold text-sm transition-all animate-in fade-in slide-in-from-bottom-2 ${
                    lastScanResult.status === "SUCCESS"
                      ? "bg-[#00A86B] text-white"
                      : "bg-[#E52E2E] text-white"
                  }`}
                >
                  {lastScanResult.status === "SUCCESS" ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>ACCÈS ACCORDÉ — Billet Valide #{lastScanResult.ticketNumber}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5" />
                      <span>ACCÈS REFUSÉ — Billet Déjà Scanné (Doublon)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Saisie Manuelle & Journal des Scans */}
            <div className="lg:col-span-5 space-y-6">
              {/* Saisie Manuelle Rapide */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/60 space-y-4">
                <h3 className="text-base font-extrabold text-[#111326] flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#009FEF]" />
                  <span>Saisie Manuelle du Code</span>
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    processScan(manualCode);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Entrez le numéro (ex: UBBI-2026-9842)"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    className="w-full bg-[#F7F7FA] border border-[#E2E4ED] focus:border-[#009FEF] focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold uppercase transition-colors outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#009FEF] hover:bg-[#0084C9] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-colors"
                  >
                    Valider le Billet Manuellement
                  </button>
                </form>
              </div>

              {/* Journal des Dernières Entrées en Direct */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/60 space-y-4">
                <h3 className="text-base font-extrabold text-[#111326] flex items-center justify-between">
                  <span>Derniers Scans Effectués</span>
                  <Clock className="w-4 h-4 text-[#666A80]" />
                </h3>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {scanHistory.map((scan) => (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#F7F7FA] border border-[#E2E4ED] text-xs"
                    >
                      <div>
                        <div className="font-extrabold text-[#111326] flex items-center gap-1.5">
                          <span>{scan.ticketNumber}</span>
                          <span className="text-[10px] bg-[#E5F6FF] text-[#009FEF] px-2 py-0.5 rounded-full font-bold">
                            {scan.category}
                          </span>
                        </div>
                        <div className="text-[#666A80] text-[11px] mt-0.5">{scan.gate} • {scan.timestamp}</div>
                      </div>
                      <span
                        className={`font-extrabold px-2.5 py-1 rounded-full text-[10px] ${
                          scan.status === "SUCCESS"
                            ? "bg-[#E6F8F0] text-[#00A86B]"
                            : "bg-[#FFEBEB] text-[#E52E2E]"
                        }`}
                      >
                        {scan.status === "SUCCESS" ? "VALIDE" : "DOUBLON"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
