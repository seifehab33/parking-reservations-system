"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, User, Ticket } from "lucide-react";
import useZone from "@/hooks/useZone";
import { LoadingWrapper } from "../loading/LoadingWrapper";
import useGates from "@/hooks/useGates";
import { useCheckInTicket } from "@/hooks/useCheckInTicket";
import { handlePrint } from "@/lib/print";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Step } from "@/types/Step";
import useGetSubscriptions from "@/hooks/admin/useGetSubscriptions";
import useGetTicket from "@/hooks/useGetTicket";
import { formatDate } from "@/lib/format-date";

export default function GateCheckIn() {
  const { Zones, ZonesLoading } = useZone();
  const { Gates, GatesLoading } = useGates();
  const { data: subscriptions } = useGetSubscriptions();
  const { mutate: doCheckIn, isPending } = useCheckInTicket();
  const printRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStepState] = useState<Step>("choose");
  const [ticketId, setTicketId] = useState<string | null>(null);
  const { data: ticketInfo, isLoading } = useGetTicket(ticketId);
  const [visitorGateId, setVisitorGateId] = useState("");
  const [visitorZoneId, setVisitorZoneId] = useState("");
  const [subscriberGateId, setSubscriberGateId] = useState("");
  const [subscriberZoneId, setSubscriberZoneId] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState<string>();
  const [confirmedUserName, setConfirmedUserName] = useState("");
  const setStep = (newStep: Step) => {
    setStepState(newStep);
    const params = new URLSearchParams(window.location.search);
    params.set("step", newStep);
    router.replace(`?${params.toString()}`);
  };
  function handleVisitorSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!visitorGateId || !visitorZoneId) return;

    doCheckIn(
      {
        gateId: visitorGateId,
        zoneId: visitorZoneId,
        type: "visitor",
      },
      {
        onSuccess: (res) => {
          setStep("visitorConfirm");
          setTicketId(res.ticket.id); // save locally
          const params = new URLSearchParams(window.location.search);
          params.set("step", "visitorConfirm");
          params.set("ticketId", res.ticket.id); // <-- add ticketId to URL
          router.replace(`?${params.toString()}`);
        },
      }
    );
  }

  function handleSubscriberSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subscriberGateId || !subscriberZoneId || !selectedSubscription) return;

    const user = subscriptions?.find((s) => s.id === selectedSubscription);
    if (user) setConfirmedUserName(user.userName);

    doCheckIn(
      {
        gateId: subscriberGateId,
        zoneId: subscriberZoneId,
        type: "subscriber",
        subscriptionId: selectedSubscription,
      },
      {
        onSuccess: (res) => {
          setStep("subscriberConfirm");
          setTicketId(res.ticket.id); // save locally
          const params = new URLSearchParams(window.location.search);
          params.set("step", "subscriberConfirm");
          params.set("ticketId", res.ticket.id);
          router.replace(`?${params.toString()}`);
        },
      }
    );
  }
  const handleNewCheckInVisitor = () => {
    setVisitorGateId("");
    setVisitorZoneId("");
    setStep("choose");
    router.replace(window.location.pathname);
  };
  const handleNewCheckInSubscriber = () => {
    setSubscriberGateId("");
    setSubscriberZoneId("");
    setSelectedSubscription(undefined);
    setConfirmedUserName("");
    setStep("choose");
    router.replace(window.location.pathname);
  };
  useEffect(() => {
    const stepParam = searchParams.get("step") as Step | null;
    const ticketId = searchParams.get("ticketId");
    if (stepParam) {
      setStepState(stepParam);
    }
    if (ticketId) {
      setTicketId(ticketId);
    }
  }, [searchParams]);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-200">
      {/* Step 1: Choose type */}
      {step === "choose" && (
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Gate Check-In</h1>
          <p className="text-gray-600">How would you like to continue?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <button
              onClick={() => setStep("visitor")}
              className="flex flex-col items-center gap-2 p-6 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md hover:border-indigo-400 transition"
            >
              <User className="h-8 w-8 text-indigo-600" />
              <span className="font-semibold text-gray-800">Visitor</span>
              <p className="text-xs text-gray-500">One-time entry</p>
            </button>
            <button
              onClick={() => setStep("subscriber")}
              className="flex flex-col items-center gap-2 p-6 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md hover:border-indigo-400 transition"
            >
              <Ticket className="h-8 w-8 text-indigo-600" />
              <span className="font-semibold text-gray-800">Subscriber</span>
              <p className="text-xs text-gray-500">Use your subscription</p>
            </button>
          </div>
        </div>
      )}

      {/* Step 2a: Visitor form */}
      {step === "visitor" && (
        <form onSubmit={handleVisitorSubmit} className="space-y-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setStep("choose")}
          >
            ← Back
          </Button>
          <h2 className="text-2xl font-bold mb-4">Visitor Check-In</h2>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Gate
            </label>
            <Select onValueChange={setVisitorGateId} value={visitorGateId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a gate" />
              </SelectTrigger>
              <SelectContent>
                {GatesLoading && <LoadingWrapper />}
                {!GatesLoading &&
                  Gates?.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Zone
            </label>
            <Select onValueChange={setVisitorZoneId} value={visitorZoneId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a zone" />
              </SelectTrigger>
              <SelectContent>
                {ZonesLoading && <LoadingWrapper />}
                {!ZonesLoading &&
                  Zones?.map((z) => (
                    <SelectItem key={z.id} value={z.id}>
                      {z.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={!visitorGateId || !visitorZoneId || isPending}
            className="w-full"
          >
            Generate Ticket
          </Button>
        </form>
      )}

      {/* Step 3a: Visitor confirmation */}
      {step === "visitorConfirm" && ticketInfo && (
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
          <h2 className="text-xl font-bold text-green-700 mb-2">
            Visitor Ticket Created
          </h2>
          <div
            ref={printRef}
            className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              🎟️ Ticket Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isLoading && <LoadingWrapper />}
              {!isLoading && (
                <>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">Ticket ID</span>
                    <Badge variant="secondary" className="mt-1 font-mono px-3">
                      {ticketInfo.id}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">Gate</span>
                    <Badge variant="secondary" className="mt-1 px-3">
                      {ticketInfo.gateId}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">Zone</span>
                    <Badge variant="secondary" className="mt-1 px-3">
                      {ticketInfo.zoneId}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">Type</span>
                    <Badge variant="secondary" className="mt-1 px-3 capitalize">
                      {ticketInfo.type}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">Check-In</span>
                    <Badge variant="secondary" className="mt-1 px-3">
                      {formatDate(ticketInfo.checkinAt)}
                    </Badge>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">Check-Out</span>
                    <Badge variant="secondary" className="mt-1 px-3">
                      {ticketInfo.checkoutAt
                        ? formatDate(ticketInfo.checkoutAt)
                        : "—"}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </div>
          <Button onClick={() => handlePrint(printRef)} className="w-full mb-2">
            🖨 Print Ticket
          </Button>
          <Button onClick={handleNewCheckInVisitor} className="w-full">
            New Check-In
          </Button>
        </div>
      )}

      {/* Step 2b: Subscriber form */}
      {step === "subscriber" && (
        <form onSubmit={handleSubscriberSubmit} className="space-y-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setStep("choose")}
          >
            ← Back
          </Button>
          <h2 className="text-2xl font-bold mb-4">Subscriber Check-In</h2>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Subscription
            </label>
            <Select
              onValueChange={setSelectedSubscription}
              value={selectedSubscription}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a subscriber" />
              </SelectTrigger>
              <SelectContent>
                {subscriptions?.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.userName} <Badge>{sub.category}</Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Gate
            </label>
            <Select
              onValueChange={setSubscriberGateId}
              value={subscriberGateId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a gate" />
              </SelectTrigger>
              <SelectContent>
                {GatesLoading && <LoadingWrapper />}
                {!GatesLoading &&
                  Gates?.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Zone
            </label>
            <Select
              onValueChange={setSubscriberZoneId}
              value={subscriberZoneId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a zone" />
              </SelectTrigger>
              <SelectContent>
                {Zones?.map((z) => (
                  <SelectItem key={z.id} value={z.id}>
                    {z.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={
              !subscriberGateId ||
              !subscriberZoneId ||
              !selectedSubscription ||
              isPending
            }
            className="w-full"
          >
            Check In
          </Button>
        </form>
      )}

      {/* Step 3b: Subscriber confirmation */}
      {step === "subscriberConfirm" && ticketInfo && (
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 h-14 w-14 text-indigo-600" />
          <h2 className="text-xl font-bold text-indigo-700 mb-2">
            Welcome back, {confirmedUserName}!
          </h2>
          <div
            ref={printRef}
            className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              🎟️ Ticket Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Ticket ID</span>
                <Badge variant="secondary" className="mt-1 font-mono px-3">
                  {ticketInfo.id}
                </Badge>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Gate</span>
                <Badge variant="secondary" className="mt-1 px-3">
                  {ticketInfo.gateId}
                </Badge>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Zone</span>
                <Badge variant="secondary" className="mt-1 px-3">
                  {ticketInfo.zoneId}
                </Badge>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Type</span>
                <Badge variant="secondary" className="mt-1 px-3 capitalize">
                  {ticketInfo.type}
                </Badge>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Check-In</span>
                <Badge variant="secondary" className="mt-1 px-3">
                  {formatDate(ticketInfo.checkinAt)}
                </Badge>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500">Check-Out</span>
                <Badge variant="secondary" className="mt-1 px-3">
                  {ticketInfo.checkoutAt
                    ? formatDate(ticketInfo.checkoutAt)
                    : "—"}
                </Badge>
              </div>
            </div>
          </div>
          <Button onClick={() => handlePrint(printRef)} className="w-full mb-2">
            🖨 Print Ticket
          </Button>
          <Button onClick={handleNewCheckInSubscriber} className="w-full">
            New Check-In
          </Button>
        </div>
      )}
    </div>
  );
}
