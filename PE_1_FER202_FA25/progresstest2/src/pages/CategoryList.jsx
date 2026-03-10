import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Badge,
  Button,
  Spinner,
  Alert,
  Card,
  Navbar,
} from "react-bootstrap";
import { FiEye, FiTrash2, FiLogOut } from "react-icons/fi";
import { useAppContext } from "../contexts/AppContext";
import {
  getExpenses,
  createExpenseAPI,
  updateExpenseAPI,
  deleteExpenseAPI,
} from "../services/accountService";
import ConfirmModal from "../components/ConfirmModal";
import ToastMessage from "../components/ToastMessage";

const ExpenseListPage = () => {
  const navigate = useNavigate();
  const { state, logout, setExpenses, addExpense, deleteExpense } =
    useAppContext();
  const { expenses, currentUser } = state;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-GB");
  };

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [updateExpense, setEditingExpense] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    expense: null,
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        setError(
          "Failed to load expenses. Make sure json-server is running on port 3001.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setExpenses]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );
  const formattedTotal = totalExpenses.toLocaleString("vi-VN") + " ₫";

  const filteredExpenses = 
    selectedCategory === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === selectedCategory);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name must not be empty");
      return;
    }
    if (!category) {
      alert("Category must not be empty");
      return;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    try {
      const newExpense = {
        name,
        amount: Number(amount),
        category,
        date: formatDate(date),
      };
      //edit mode
      if (updateExpense) {
        const updated = await updateExpenseAPI(updateExpense.id, newExpense);
        updateExpense(updated);
        setToast({
          show: true,
          message: "Updated successfully",
          variant: "success",
        });
        setEditingExpense(null);
      }
      //add mode
      else {
        const created = await createExpenseAPI(newExpense);
        addExpense(created);
        setToast({
          show: true,
          message: "Added successfully",
          variant: "success",
        });
      }
      handleResetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetForm = () => {
    setName("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);

    setName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
  };

  const handleDeleteClick = (expense) => {
    setConfirmModal({ show: true, expense });
  };

  const handleConfirm = async () => {
    const { expense } = confirmModal;
    try {
      await deleteExpenseAPI(expense.id);
      deleteExpense(expense.id);
      setToast({
        show: true,
        message: "Deleted successfully",
        variant: "success",
      });
    } catch (err) {
      setToast({ show: true, message: "Delete failed!", variant: "danger" });
    }
    setConfirmModal({ show: false, expense: null });
  };

  const handleCancel = () => {
    setConfirmModal({ show: false, expense: null });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Navbar */}
      <Navbar className="d-flex align-items-center justify-content-between px-4 py-3 bg-white shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <img src="/logo.jpg" alt="Logo" width={32} height={32} />
          <span className="text-dark fw-bold fs-5">PersonalBudget</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="text-dark-50 small">
            Signed in as{" "}
            <span className="text-dark fw-semibold">
              {currentUser?.username}
            </span>
          </span>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleLogout}
            className="d-flex align-items-center gap-1"
          >
            <FiLogOut size={14} /> Logout
          </Button>
        </div>
      </Navbar>

      <Card className="p-4 border-0 shadow-sm" style={{ borderRadius: "12px" }}>
        <div className="row mx-4 my-4">
          <div className="col-md-4">
            <h4 className="fw-bold mb-0 text-dark">
              Total of expenses
            </h4>
            <p className="text-success fw-bold fs-5 mb-0">
              {formattedTotal}
            </p>
          </div>
          <div className="col-md-4">
            <h4 className="fw-bold mb-0 text-dark">Filter</h4>
            <select 
              className="form-select" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>
        </div>
      </Card>

      <Card
        className="p-4 border-0 shadow-sm" //p-4 : bên trái phải trên dưới cách đều nhau, border-0 : bỏ viền, shadow-sm : đổ bóng nhẹ
        style={{ borderRadius: "12px" }}
      >
        <div className="row mx-4 my-4">
          <div className="col-md-4">
            <h4
              className="fw-bold mb-3" //fw-bold: chữ đậm, mb-3: margin-bottom 3 (khoảng cách dưới 1 phần 4 của kích thước font)
            >
              {updateExpense ? "Edit Expense" : "Add New Expense"}
            </h4>
            <form onSubmit={handleAddExpense}>
              <div className="mb-3">
                <label className="form-label small text-muted">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Expense Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small text-muted">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small text-muted">
                    Category
                  </label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label small text-muted">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="d-flex gap-2 ">
                <Button variant="secondary" onClick={handleResetForm}>
                  Reset
                </Button>
                <Button type="submit" variant="primary">
                  {updateExpense ? "Save" : "Add Expense"}
                </Button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <h4 className="fw-bold mb-3">Expense Management</h4>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Loading...</p>
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <div className="bg-white rounded-3 shadow-sm overflow-hidden">
                <Table responsive hover className="mb-0 align-middle">
                  <thead
                    style={{
                      background: "#f8fafc",
                      borderBottom: "2px solid #e2e8f0",
                    }}
                  >
                    <tr>
                      <th className="form-label small text-dark">Name</th>
                      <th className="form-label small text-dark">Amount</th>
                      <th className="form-label small text-dark">Category</th>
                      <th className="form-label small text-dark">Date</th>
                      <th className="form-label small text-dark"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-5 text-muted">
                          No expenses found.
                        </td>
                      </tr>
                    ) : (
                      filteredExpenses.map((exp) => (
                        <tr key={exp.id}>
                          <td className="px-4 py-3 fw-semibold text-dark">
                            {exp.name}
                          </td>
                          <td className="px-4 py-3 text-success fw-semibold">
                            {Number(exp.amount).toLocaleString("vi-VN")} đ
                          </td>
                          <td className="px-4 py-3">
                            <Badge bg="info" style={{ borderRadius: "6px" }}>
                              {exp.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-muted">{exp.date}</td>
                          <td className="px-4 py-3">
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleEdit(exp)}
                                className="d-flex align-items-center gap-1"
                              >
                                <FiEye size={14} /> Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteClick(exp)}
                                className="d-flex align-items-center gap-1"
                              >
                                <FiTrash2 size={14} /> Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </Card>

      <ConfirmModal
        show={confirmModal.show}
        title="Delete Expense"
        message={`Delete expense "${confirmModal.expense?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmVariant="danger"
      />

      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default ExpenseListPage;
