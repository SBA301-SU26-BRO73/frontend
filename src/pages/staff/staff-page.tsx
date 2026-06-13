import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserPlus, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import { StaffTable } from './components/staff-table'
import { StaffFormModal } from './components/staff-form-modal'
import { getStaffByBranch, deleteStaff } from '@/services/staff/staff.api'
import type { StaffResponse, UserStatus } from '@/types/staff'

// TODO: lấy branchId từ auth context khi có
const BRANCH_ID = 1

type StatusFilter = 'all' | UserStatus

const STATUS_TABS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'ACTIVE', label: 'Active' },
  { id: 'INACTIVE', label: 'Inactive' },
  { id: 'LOCKED', label: 'Locked' },
]

export function StaffPage() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(0)
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [showForm, setShowForm] = useState(false)
  const [editingStaff, setEditingStaff] = useState<StaffResponse | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const PAGE_SIZE = 20

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['staff', BRANCH_ID, page],
    queryFn: () => getStaffByBranch(BRANCH_ID, page, PAGE_SIZE),
  })

  const allStaff = data?.content ?? []
  const totalElements = data?.totalElements ?? 0
  const totalPages = data?.totalPages ?? 1

  const deleteMutation = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', BRANCH_ID] })
      setDeletingId(null)
    },
  })

  // Client-side filter (search + status)
  const filtered = allStaff.filter((s) => {
    if (statusFilter !== 'all' && s.userStatus !== statusFilter) return false
    if (!q.trim()) return true
    const t = q.toLowerCase()
    return s.email.toLowerCase().includes(t) || String(s.id).includes(t)
  })

  function countByStatus(status: UserStatus) {
    return allStaff.filter((s) => s.userStatus === status).length
  }

  function handleEdit(s: StaffResponse) {
    setEditingStaff(s)
    setShowForm(true)
  }

  function handleDelete(id: number) {
    setDeletingId(id)
  }

  function handleCloseForm() {
    setShowForm(false)
    setEditingStaff(null)
  }

  const startRow = totalElements === 0 ? 0 : page * PAGE_SIZE + 1
  const endRow = Math.min((page + 1) * PAGE_SIZE, totalElements)

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Nhân viên</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Quản lý tài khoản nhân viên · {totalElements} tài khoản
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            icon={<RefreshCw size={14} />}
            onClick={() => refetch()}
            disabled={isLoading}
          >
            Làm mới
          </Button>
          <Button
            variant="primary"
            icon={<UserPlus size={15} />}
            onClick={() => {
              setEditingStaff(null)
              setShowForm(true)
            }}
          >
            Thêm nhân viên
          </Button>
        </div>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-4 py-3">
          <SearchInput
            value={q}
            onChange={setQ}
            placeholder="Tìm theo email…"
          />

          {/* Segmented status filter */}
          <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            {STATUS_TABS.map((tab) => {
              const count =
                tab.id === 'all'
                  ? allStaff.length
                  : countByStatus(tab.id as UserStatus)
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                    statusFilter === tab.id
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                  <span className="text-slate-400">{count}</span>
                </button>
              )
            })}
          </div>

          <span className="ml-auto font-mono text-xs text-slate-400">
            {filtered.length} / {allStaff.length}
          </span>
        </div>

        {/* Table */}
        <StaffTable
          staff={filtered}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => {
            setEditingStaff(null)
            setShowForm(true)
          }}
        />

        {/* Pagination */}
        {!isLoading && totalElements > 0 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            <span>
              Hiển thị {startRow}–{endRow} / {totalElements}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-md border border-slate-200 p-1 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft size={13} />
              </button>
              <span className="font-mono">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="rounded-md border border-slate-200 p-1 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit modal */}
      {showForm && (
        <StaffFormModal
          mode={editingStaff ? 'edit' : 'create'}
          initial={editingStaff ?? undefined}
          branchId={BRANCH_ID}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete confirmation */}
      {deletingId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="font-semibold text-slate-900">Xác nhận xoá</h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Nhân viên sẽ bị vô hiệu hoá và không thể đăng nhập. Hành động
              này không thể hoàn tác.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button onClick={() => setDeletingId(null)}>Huỷ</Button>
              <Button
                variant="danger"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(deletingId)}
              >
                {deleteMutation.isPending ? 'Đang xoá…' : 'Xoá nhân viên'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
