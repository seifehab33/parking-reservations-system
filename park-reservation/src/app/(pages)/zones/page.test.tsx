import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Zones from "./page";
import useZone from "@/hooks/useZone";
import useCategories from "@/hooks/useCategories";

// parking-reservations-system/park-reservation/src/app/(pages)/zones/page.test.tsx

// Mock UI components
jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <div>{children}</div>,
}));
jest.mock("@/components/ui/status-badge", () => ({
  StatusBadge: ({ children }: any) => <span>{children}</span>,
}));
jest.mock("@/components/ui/progress", () => ({
  Progress: ({ value }: any) => <div data-testid="progress">{value}%</div>,
}));
jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));
jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, className }: any) => (
    <span className={className}>{children}</span>
  ),
}));
jest.mock("@/components/loading/LoadingWrapper", () => ({
  LoadingWrapper: () => <div data-testid="loading">Loading...</div>,
}));

// Mock icons
jest.mock("lucide-react", () => {
  const MockIcon = (props: any) => <svg {...props} />;
  return {
    MapPin: MockIcon,
    Search: MockIcon,
    Car: MockIcon,
    Users: MockIcon,
    Clock: MockIcon,
    DollarSign: MockIcon,
    CheckCircle: MockIcon,
    XCircle: MockIcon,
    Filter: MockIcon,
  };
});

// Mock hooks
jest.mock("@/hooks/useZone");
jest.mock("@/hooks/useCategories");

const mockZones = [
  {
    id: "zone1",
    name: "VIP Zone",
    categoryId: "cat_vip",
    open: true,
    occupied: 5,
    totalSlots: 10,
    free: 5,
    reserved: 2,
    gateIds: ["g1", "g2"],
    rateNormal: 10,
    rateSpecial: 20,
    availableForVisitors: 3,
    availableForSubscribers: 2,
  },
  {
    id: "zone2",
    name: "Economy Zone",
    categoryId: "cat_economy",
    open: false,
    occupied: 9,
    totalSlots: 10,
    free: 1,
    reserved: 1,
    gateIds: ["g3"],
    rateNormal: 5,
    rateSpecial: 8,
    availableForVisitors: 0,
    availableForSubscribers: 1,
  },
];

const mockCats = [
  { id: "cat_vip", name: "VIP" },
  { id: "cat_economy", name: "Economy" },
];

describe("Zones page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useZone as jest.Mock).mockReturnValue({
      Zones: mockZones,
      ZonesLoading: false,
    });
    (useCategories as jest.Mock).mockReturnValue({
      Cats: mockCats,
    });
  });

  it("renders loading state", () => {
    (useZone as jest.Mock).mockReturnValueOnce({
      Zones: [],
      ZonesLoading: true,
    });
    render(<Zones />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders all zones", () => {
    render(<Zones />);
    expect(screen.getByText("Parking Zones")).toBeInTheDocument();
    expect(screen.getAllByTestId("card")).toHaveLength(2);
    expect(screen.getByText("VIP Zone")).toBeInTheDocument();
    expect(screen.getByText("Economy Zone")).toBeInTheDocument();
  });

  it("filters zones by search", () => {
    render(<Zones />);
    const input = screen.getByPlaceholderText("Search zones...");
    fireEvent.change(input, { target: { value: "VIP" } });
    expect(screen.getByText("VIP Zone")).toBeInTheDocument();
    expect(screen.queryByText("Economy Zone")).not.toBeInTheDocument();
  });

  it("filters zones by category", () => {
    render(<Zones />);
    const select = screen.getByDisplayValue("All Categories");
    fireEvent.change(select, { target: { value: "cat_economy" } });
    expect(screen.getByText("Economy Zone")).toBeInTheDocument();
    expect(screen.queryByText("VIP Zone")).not.toBeInTheDocument();
  });

  it("shows no zones found when filter yields no results", () => {
    render(<Zones />);
    const input = screen.getByPlaceholderText("Search zones...");
    fireEvent.change(input, { target: { value: "notfound" } });
    expect(screen.getByText("No zones found")).toBeInTheDocument();
  });

  it("shows zone details", () => {
    render(<Zones />);
    expect(screen.getByText("5/10")).toBeInTheDocument(); // Occupancy for VIP Zone
    expect(screen.getByText("$10")).toBeInTheDocument(); // Normal rate
    expect(screen.getByText("$20")).toBeInTheDocument(); // Special rate
    expect(screen.getByText("3 available")).toBeInTheDocument(); // Visitors
    expect(screen.getByText("2 available")).toBeInTheDocument(); // Subscribers
  });
});
