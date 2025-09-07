import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZoneData } from "@/types/Zone";
import { GatesData } from "@/types/Gates";
import ZoneDialog from "../dialogs/GateZoneId";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/ErrorReponse";

interface Props {
  Gates: GatesData[];
  Zones: ZoneData[];
  GatesLoading: boolean;
  isGatesError: boolean;
  GatesError: AxiosError<ErrorResponse> | null;
  onRetryGates: () => void;
}

export default function GatesCard({
  Gates,
  Zones,
  GatesLoading,
  isGatesError,
  GatesError,
}: Props) {
  const [selectedGateId, setSelectedGateId] = useState<string | null>(null);

  return (
    <>
      <Card className="bg-gradient-card shadow-md max-h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DoorOpen className="h-5 w-5 text-warning" />
            Recent Gates
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {isGatesError && <div>{GatesError?.message || "Error"}</div>}

          {GatesLoading ? (
            <div>Loading...</div>
          ) : (
            Gates?.map((gate) => (
              <div
                key={gate.id}
                className="flex flex-col gap-1 p-2 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{gate.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Location: {gate.location}
                    </div>
                  </div>
                </div>

                {/* Zone buttons */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {gate.zoneIds.map((zoneId) => {
                    const zone = Zones.find((z) => z.id === zoneId);
                    if (!zone) return null;
                    return (
                      <Button
                        key={zone.id}
                        size="sm"
                        variant="outline"
                        className="px-2 py-0.5 text-[10px] uppercase"
                        onClick={() => setSelectedGateId(gate.id)}
                      >
                        {zone.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      {selectedGateId && (
        <ZoneDialog
          gateId={selectedGateId}
          open={!!selectedGateId}
          onClose={() => setSelectedGateId(null)}
        />
      )}
    </>
  );
}
