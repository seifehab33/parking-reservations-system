"use client";
import { ErrorWrapper } from "@/components/error/ErrorWrapper";
import { LoadingWrapper } from "@/components/loading/LoadingWrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useGetSubscriptions from "@/hooks/admin/useGetSubscriptions";
import { formatDate } from "@/lib/format-date";
import { Car, Calendar, CheckCircle, XCircle, User } from "lucide-react";

const Subscriptions = () => {
  const {
    data: subscriptions,
    isLoading: loadingSubs,
    isError: iserrorSubs,
    error: errorSubs,
    refetch: refetchSubs,
  } = useGetSubscriptions();
  const handleRefetchSubs = () => {
    refetchSubs();
  };
  if (iserrorSubs)
    return <ErrorWrapper error={errorSubs} onRetry={handleRefetchSubs} />;
  return (
    <TooltipProvider>
      <main className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10">
          Subscriptions Dashboard
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loadingSubs && (
            <div className="col-span-full">
              <LoadingWrapper />
            </div>
          )}

          {!loadingSubs && subscriptions?.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              No subscriptions found.
            </div>
          )}
          {!loadingSubs &&
            subscriptions?.map((subscription) => (
              <article
                key={subscription.id}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-xl cursor-pointer"
                tabIndex={0}
                aria-label={`Subscription for ${subscription.userName}`}
              >
                {/* Header */}
                <header className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <User className="h-7 w-7 text-indigo-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {subscription.userName}
                      </h2>
                      <p className="text-xs text-gray-400 select-text font-mono">
                        ID: {subscription.id}
                      </p>
                    </div>
                  </div>
                  {subscription.active ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm">
                      <CheckCircle className="h-4 w-4" /> Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm">
                      <XCircle className="h-4 w-4" /> Inactive
                    </Badge>
                  )}
                </header>

                <Separator className="my-4" />

                {/* Category */}
                <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">
                  Category
                </p>
                <p className="text-lg font-semibold text-gray-900 capitalize mb-6">
                  {subscription.category.replace("cat_", "")}
                </p>

                {/* Cars */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-md font-semibold text-gray-900">
                      Registered Cars ({subscription.cars.length})
                    </h3>
                  </div>
                  <ul className="space-y-3 max-h-36 overflow-y-auto pr-2">
                    {subscription.cars.map((car, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3 shadow-sm group-hover:bg-indigo-50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {car.brand} {car.model}
                          </p>
                          <p className="text-xs text-gray-500">
                            Plate:{" "}
                            <span className="font-mono">{car.plate}</span> ·{" "}
                            <span className="capitalize">{car.color}</span>
                          </p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="secondary"
                              className="uppercase cursor-default"
                            >
                              {car.plate}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center">
                            <p>License Plate</p>
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-indigo-600">
                      <Calendar className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        Starts At
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(subscription.startsAt)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-indigo-600">
                      <Calendar className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase tracking-wide">
                        Expires At
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(subscription.expiresAt)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </main>
    </TooltipProvider>
  );
};

export default Subscriptions;
