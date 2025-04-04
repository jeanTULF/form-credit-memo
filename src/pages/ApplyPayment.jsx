import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const ApplyPayment = ({ open, onClose, sourceActivity, activities, onApplyPayment }) => {
    const [availableAmount, setAvailableAmount] = useState(sourceActivity?.saldo || 0);
  const [distributions, setDistributions] = useState([]);
  const [referencia, setReferencia] = useState("");
  const [metodo, setMetodo] = useState("Transferencia");

  useEffect(() => {
    if (open && sourceActivity) {
      setAvailableAmount(sourceActivity.saldo);
      setDistributions([]);
      setReferencia(`REF-${Date.now().toString().slice(-6)}`);
      setMetodo("Transferencia");
    }
  }, [open, sourceActivity]);

  const addDistribution = () => {
    if (availableAmount <= 0) return;

    setDistributions([
      ...distributions,
      {
        activityId: "",
        monto: 0,
        referencia,
        metodo,
        notas: "",
      },
    ]);
  };

  const removeDistribution = (index) => {
    const newDistributions = [...distributions];
    const removedAmount = newDistributions[index].monto;
    newDistributions.splice(index, 1);
    setDistributions(newDistributions);
    setAvailableAmount(availableAmount + removedAmount);
  };

  const updateDistribution = (index, field, value) => {
    const newDistributions = [...distributions];

    if (field === "monto") {
      const oldAmount = newDistributions[index].monto;
      const newAmount = typeof value === "string" ? Number.parseFloat(value) : value;
      const difference = newAmount - oldAmount;
      if (difference > availableAmount) {
        newDistributions[index].monto = oldAmount + availableAmount;
        setAvailableAmount(0);
      } else {
        newDistributions[index].monto = newAmount;
        setAvailableAmount(availableAmount - difference);
      }
    } else {
      newDistributions[index][field] = value;
    }

    setDistributions(newDistributions);
  };

  const handleApplyPayment = () => {
    const isValid = distributions.every(
      (d) => d.activityId && d.monto > 0 && d.referencia.trim() !== "" && d.metodo.trim() !== ""
    );

    if (!isValid || distributions.length === 0) {
      alert("Por favor complete todos los campos requeridos para cada pago.");
      return;
    }

    onApplyPayment(sourceActivity.id, distributions);
    onClose();
  };

  const totalDistributed = distributions.reduce((sum, d) => sum + d.monto, 0);
  const applicableActivities = activities.filter((a) => a.saldo > 0);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Aplicar Pago desde {sourceActivity?.numero}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleApplyPayment} disabled={distributions.length === 0 || totalDistributed === 0}>
            Aplicar Pagos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyPayment