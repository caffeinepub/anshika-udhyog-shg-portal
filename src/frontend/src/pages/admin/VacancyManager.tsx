import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Vacancy } from "../../types";

const emptyForm = {
  title: "",
  description: "",
  qualification: "",
  salary: "",
  lastDate: "",
  location: "",
  active: true,
};

export function VacancyManager() {
  const { state, addVacancy, updateVacancy, deleteVacancy } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [editItem, setEditItem] = useState<Vacancy | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const handleAdd = () => {
    if (!form.title || !form.location) {
      toast.error("Title & location required");
      return;
    }
    addVacancy({ ...form });
    toast.success("Vacancy added!");
    setForm(emptyForm);
    setAddOpen(false);
  };

  const handleUpdate = () => {
    if (!editItem) return;
    updateVacancy(editItem);
    toast.success("Vacancy updated!");
    setEditItem(null);
  };

  const VacancyForm = ({
    data,
    onChange,
    onSave,
    onCancel,
    saveLabel,
  }: {
    data: typeof emptyForm | Vacancy;
    onChange: (d: any) => void;
    onSave: () => void;
    onCancel: () => void;
    saveLabel: string;
  }) => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Title *</Label>
          <Input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="mt-1"
            data-ocid="vacancy.input"
          />
        </div>
        <div>
          <Label className="text-xs">Location *</Label>
          <Input
            value={data.location}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            className="mt-1"
            data-ocid="vacancy.input"
          />
        </div>
        <div>
          <Label className="text-xs">Salary</Label>
          <Input
            value={data.salary}
            onChange={(e) => onChange({ ...data, salary: e.target.value })}
            className="mt-1"
            data-ocid="vacancy.input"
          />
        </div>
        <div>
          <Label className="text-xs">Last Date</Label>
          <Input
            type="date"
            value={data.lastDate}
            onChange={(e) => onChange({ ...data, lastDate: e.target.value })}
            className="mt-1"
            data-ocid="vacancy.input"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs">Qualification</Label>
        <Input
          value={data.qualification}
          onChange={(e) => onChange({ ...data, qualification: e.target.value })}
          className="mt-1"
          data-ocid="vacancy.input"
        />
      </div>
      <div>
        <Label className="text-xs">Description</Label>
        <Textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={2}
          className="mt-1"
          data-ocid="vacancy.textarea"
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={data.active}
          onCheckedChange={(v) => onChange({ ...data, active: v })}
          data-ocid="vacancy.switch"
        />
        <Label className="text-xs">Active (visible publicly)</Label>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onSave}
          className="text-gray-900 font-semibold"
          style={{ background: "#FFC107" }}
          data-ocid="vacancy.submit_button"
        >
          {saveLabel}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          data-ocid="vacancy.cancel_button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-amber-600" /> Vacancy Manager
        </h1>
        <Button
          onClick={() => setAddOpen(!addOpen)}
          className="text-gray-900 font-bold text-xs"
          style={{ background: "#FFC107" }}
          data-ocid="vacancy.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Vacancy
        </Button>
      </div>

      {addOpen && (
        <Card className="mb-4 border-amber-300">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">➕ New Vacancy</CardTitle>
          </CardHeader>
          <CardContent>
            <VacancyForm
              data={form}
              onChange={setForm}
              onSave={handleAdd}
              onCancel={() => setAddOpen(false)}
              saveLabel="Add Vacancy"
            />
          </CardContent>
        </Card>
      )}

      {editItem && (
        <Card className="mb-4 border-blue-300">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">✏️ Edit Vacancy</CardTitle>
          </CardHeader>
          <CardContent>
            <VacancyForm
              data={editItem}
              onChange={setEditItem}
              onSave={handleUpdate}
              onCancel={() => setEditItem(null)}
              saveLabel="Save Changes"
            />
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {state.vacancies.length === 0 && (
          <div
            className="text-center py-10 text-gray-400"
            data-ocid="vacancy.empty_state"
          >
            No vacancies yet.
          </div>
        )}
        {state.vacancies.map((vacancy, idx) => (
          <Card key={vacancy.id} data-ocid={`vacancy.item.${idx + 1}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {vacancy.title}
                    </h3>
                    <Badge
                      variant={vacancy.active ? "default" : "secondary"}
                      className={`text-[10px] ${vacancy.active ? "bg-green-100 text-green-800" : ""}`}
                    >
                      {vacancy.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-600">
                    <span>📍 {vacancy.location}</span>
                    {vacancy.salary && <span>💰 {vacancy.salary}</span>}
                    {vacancy.lastDate && (
                      <span>📅 Last Date: {vacancy.lastDate}</span>
                    )}
                  </div>
                  {vacancy.qualification && (
                    <p className="text-xs text-gray-500 mt-1">
                      🎓 {vacancy.qualification}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-blue-600"
                    onClick={() => setEditItem(vacancy)}
                    data-ocid={`vacancy.edit_button.${idx + 1}`}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-600"
                    onClick={() => {
                      deleteVacancy(vacancy.id);
                      toast.success("Deleted!");
                    }}
                    data-ocid={`vacancy.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
