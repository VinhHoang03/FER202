import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Badge, Image, Spinner, Alert } from 'react-bootstrap';
import { FiLogOut, FiEye, FiLock, FiUnlock } from 'react-icons/fi';
import { getUsers, updateAccount } from '../services/accountService';
import { useAppContext } from '../contexts/AppContext';
import FilterBar from '../components/FilterBar';
import ConfirmModal from '../components/ConfirmModal';
import ToastMessage from '../components/ToastMessage';

const AccountList = () => {
  const navigate = useNavigate();
  const { state, logout, setUsers, updateAccountStatus } = useAppContext();
  const { currentUser, users } = state;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Filter and sort state
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    sortBy: '',
  });
  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    accountId: null,
    action: '', // 'lock' or 'unlock'
  });
  //Toast state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success',
  });
  //Warning for self-locking
  const [selfLockWarning, setSelfLockWarning] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [setUsers]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getFilteredAccounts = () => {
    let results = [...users];
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        (usr) =>
          usr.username.toLowerCase().includes(searchLower) ||
          usr.email.toLowerCase().includes(searchLower)
      );
    }
    if (filters.status !== 'all') {
      results = results.filter((usr) => usr.status === filters.status);
    }
    if (filters.role !== 'all') {
      results = results.filter((usr) => usr.role === filters.role);
    }
    if (filters.sortBy) {
      results.sort((a, b) => {
        switch (filters.sortBy) {
          case 'username_asc':
            return a.username.localeCompare(b.username);
          case 'username_desc':
            return b.username.localeCompare(a.username);
          case 'role_admin':
            return a.role === 'admin' ? -1 : b.role === 'admin' ? 1 : 0;
          case 'role_user':
            return a.role === 'user' ? -1 : b.role === 'user' ? 1 : 0;
          case 'status_active':
            return a.status === 'active' ? -1 : b.status === 'active' ? 1 : 0;
          case 'status_locked':
            return a.status === 'locked' ? -1 : b.status === 'locked' ? 1 : 0;
          default:
            return 0;
        }
      });
    }
    return results;
  };

  const handleLockUnlockClick = (account) => {
    setSelfLockWarning('');
    if (account.id === currentUser?.id && account.status === 'active') {
      setSelfLockWarning(`Cannot lock your own account (${account.username}). Please ask another admin to do this if necessary.`);
      return;
    }
    setConfirmModal({
      show: true,
      account,
      action: account.status === 'active' ? 'lock' : 'unlock',
    });
  };

  const handleConfirm = async () => {
    const { account, action } = confirmModal;
    const newStatus = action === 'lock' ? 'locked' : 'active';
    try {
      await updateAccount(account.id, { status: newStatus });
      updateAccountStatus(account.id, newStatus);
      setToast({
        show: true,
        message: action === 'lock' ? `Account ${account.username} locked successfully.` : `Account ${account.username} unlocked successfully.`,
        variant: 'success',
      });
    } catch (error) {
      setToast({
        show: true,
        message: 'Update failed. Please try again.',
        variant: 'danger',
      });
    }
    setConfirmModal({ show: false, accountId: null, action: '' });
  };

  const handleCancel = () => {
    setConfirmModal({ show: false, accountId: null, action: '' });
  };

  const filteredAccounts = getFilteredAccounts();

  return (
      <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
        {/* Navbar */}
        <div
          className="d-flex align-items-center justify-content-between px-4 py-3"
        >
          <div className="d-flex align-items-center gap-2">
            <img src="/logo.jpg" alt="Logo" width={32} height={32} />
            <span className="text-dark fw-bold fs-5">PersonalBudget</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="text-dark-50 small">
              Logged in as <span className="text-dark fw-semibold">{currentUser?.fullName}</span>
            </span>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={handleLogout}
              className="d-flex align-items-center gap-1"
            >
              <FiLogOut size={14} /> Logout
            </Button>
          </div>
        </div>
  
        <Container className="py-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h4 className="fw-bold mb-0 text-dark">User Accounts</h4>
              <p className="text-muted small mb-0">Manage all system accounts</p>
            </div>
            <Badge bg="primary" className="fs-6 px-3 py-2" style={{ borderRadius: '20px' }}>
              {filteredAccounts.length} accounts
            </Badge>
          </div>
  
          {/* FilterBar */}
          <FilterBar filters={filters} onFilterChange={setFilters} />
  
          {/* Self-lock warning */}
          {selfLockWarning && (
            <Alert
              variant="warning"
              dismissible
              onClose={() => setSelfLockWarning('')}
              className="mb-3"
            >
              ⚠️ {selfLockWarning}
            </Alert>
          )}
  
          {/* Table */}
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Loading accounts...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div className="bg-white rounded-3 shadow-sm overflow-hidden">
              <Table responsive hover className="mb-0 align-middle">
                <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <tr>
                    <th className="px-4 py-3 text-muted small text-uppercase fw-semibold">Avatar</th>
                    <th className="px-4 py-3 text-muted small text-uppercase fw-semibold">Username</th>
                    <th className="px-4 py-3 text-muted small text-uppercase fw-semibold">Email</th>
                    <th className="px-4 py-3 text-muted small text-uppercase fw-semibold">Role</th>
                    <th className="px-4 py-3 text-muted small text-uppercase fw-semibold">Status</th>
                    <th className="px-4 py-3 text-muted small text-uppercase fw-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-5 text-muted">
                        No accounts found.
                      </td>
                    </tr>
                  ) : (
                    filteredAccounts.map((acc) => (
                      <tr key={acc.id}>
                        <td className="px-4 py-3">
                          <Image
                            src={acc.avatar}
                            alt={acc.username}
                            roundedCircle
                            width={40}
                            height={40}
                            style={{ objectFit: 'cover', border: '2px solid #e2e8f0' }}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${acc.username}&background=3b82f6&color=fff&size=40`;
                            }}
                          />
                        </td>
                        <td className="px-4 py-3 fw-semibold text-dark">{acc.username}</td>
                        <td className="px-4 py-3 text-muted">{acc.email}</td>
                        <td className="px-4 py-3">
                          <Badge
                            bg={acc.role === 'admin' ? 'primary' : 'secondary'}
                            style={{ borderRadius: '6px' }}
                          >
                            {acc.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            bg={acc.status === 'active' ? 'success' : 'danger'}
                            style={{ borderRadius: '6px' }}
                          >
                            {acc.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => navigate(`/accounts/${acc.id}`)}
                              className="d-flex align-items-center gap-1"
                            >
                              <FiEye size={14} /> View Details
                            </Button>
                            <Button
                              variant={acc.status === 'active' ? 'outline-danger' : 'outline-success'}
                              size="sm"
                              onClick={() => handleLockUnlockClick(acc)}
                              className="d-flex align-items-center gap-1"
                            >
                              {acc.status === 'active' ? (
                                <><FiLock size={14} /> Lock</>
                              ) : (
                                <><FiUnlock size={14} /> Unlock</>
                              )}
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
        </Container>
  
        {/* Confirm Modal */}
        <ConfirmModal
          show={confirmModal.show}
          title={confirmModal.action === 'lock' ? 'Lock Account' : 'Unlock Account'}
          message={
            confirmModal.action === 'lock'
              ? `Lock account ${confirmModal.account?.username}? The user cannot log in after this.`
              : `Unlock account ${confirmModal.account?.username}?`
          }
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmVariant={confirmModal.action === 'lock' ? 'danger' : 'success'}
        />
  
        {/* Toast */}
        <ToastMessage
          show={toast.show}
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast({ ...toast, show: false })}
        />
      </div>
    );
  };

export default AccountList;