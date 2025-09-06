"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCategories from "@/hooks/useCategories";
import { useUpdateCategory } from "@/hooks/admin/useUpdateCateogry";
import { CategoriesData } from "@/types/Categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoriesStore } from "@/store/categoriesStore";

function Categories() {
  const router = useRouter();
  const { Cats, CatsLoading } = useCategories();
  const { categories, setCategories, updateCategory } = useCategoriesStore();
  const updateMutation = useUpdateCategory();

  const [open, setOpen] = useState(false);
  const [currentCat, setCurrentCat] = useState<CategoriesData | null>(null);
  const [form, setForm] = useState({
    name: "",
    rateNormal: "",
    rateSpecial: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, [router]);

  useEffect(() => {
    if (Cats) setCategories(Cats);
  }, [Cats, setCategories]);

  const startEdit = (cat: CategoriesData) => {
    setCurrentCat(cat);
    setForm({
      name: cat.name,
      rateNormal: cat.rateNormal.toString(),
      rateSpecial: cat.rateSpecial.toString(),
    });
    setOpen(true);
  };

  const handleUpdate = () => {
    if (!currentCat) return;
    const updated = {
      id: currentCat.id,
      name: form.name,
      rateNormal: form.rateNormal ? Number(form.rateNormal) : 0,
      rateSpecial: form.rateSpecial ? Number(form.rateSpecial) : 0,
    };
    updateMutation.mutate(updated, {
      onSuccess: (data) => {
        updateCategory(data);
        setOpen(false);
      },
    });
  };

  return (
    <div className="space-y-6 px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Categories
      </h1>

      {CatsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl shadow animate-pulse bg-muted/20"
            >
              <Skeleton className="h-6 w-3/4 mb-3 rounded" />
              <Skeleton className="h-4 w-1/2 mb-3 rounded" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((cat) => (
            <div
              key={cat.id}
              className="p-6 border rounded-xl shadow hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold text-black mb-2">
                {cat.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Normal Rate:{" "}
                <span className="font-medium text-success">
                  {cat.rateNormal || "-"}
                </span>{" "}
                • Special Rate:{" "}
                <span className="font-medium text-warning">
                  {cat.rateSpecial || "-"}
                </span>
              </p>
              <Button
                className="mt-auto w-full"
                size="sm"
                onClick={() => startEdit(cat)}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Input
              placeholder="Category Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Normal Rate"
              value={form.rateNormal}
              onChange={(e) => setForm({ ...form, rateNormal: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Special Rate"
              value={form.rateSpecial}
              onChange={(e) =>
                setForm({ ...form, rateSpecial: e.target.value })
              }
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Categories;
