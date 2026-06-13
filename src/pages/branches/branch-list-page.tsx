import { useEffect, useMemo, useState } from 'react'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  Clock,
  MapPin,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { deleteBranch, getBranches } from '@/services/branch/branch.api'
import type { Branch, BranchSortField, SortDirection } from '@/types/branch'
import { getBranchErrorMessage } from './branch-error.utils'

interface Court {
  id: number
  name: string
  sportType: string
  hourlyPrice: number
  status: 'ACTIVE' | 'INACTIVE'
}

const sortOptions: Array<{ value: BranchSortField; label: string }> = [
  { value: 'name', label: 'Tên cơ sở' },
  { value: 'city', label: 'Thành phố' },
  { value: 'createdAt', label: 'Ngày tạo' },
  { value: 'updatedAt', label: 'Ngày cập nhật' },
]

type LocationState = { successMessage?: string } | null

function formatTime(time: string) {
  return time.slice(0, 5)
}

function formatAddress(branch: Branch) {
  return [branch.address, branch.ward, branch.city].filter(Boolean).join(', ')
}

export function BranchListPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const successMessage = (location.state as LocationState)?.successMessage
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sortField, setSortField] = useState<BranchSortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null)

  const branchQuery = useQuery({
    queryKey: ['branches', 'list', page, size, sortField, sortDirection],
    queryFn: () => getBranches({ page, size, sortField, sortDirection }),
    placeholderData: keepPreviousData,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBranch,
    onSuccess: async (_, deletedBranchId) => {
      if (selectedBranchId === deletedBranchId) setSelectedBranchId(null)
      if (branchQuery.data?.numberOfElements === 1 && page > 0) {
        setPage((current) => current - 1)
      }
      await queryClient.invalidateQueries({ queryKey: ['branches'] })
    },
  })

  function handleDelete(branch: Branch) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa cơ sở "${branch.name}" không?`,
    )
    if (confirmed) deleteMutation.mutate(branch.id)
  }

  useEffect(() => {
    if (!successMessage) return
    const timeoutId = window.setTimeout(() => {
      navigate(location.pathname, { replace: true, state: null })
    }, 5000)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname, navigate, successMessage])

  const data = branchQuery.data

  const filteredBranches = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('vi')
    if (!normalizedSearch) return data?.content ?? []

    return (data?.content ?? []).filter((branch) =>
      [branch.name, branch.address, branch.ward, branch.city].some((value) =>
        value?.toLocaleLowerCase('vi').includes(normalizedSearch),
      ),
    )
  }, [data, searchTerm])

  const selectedBranch =
    data?.content.find((branch) => branch.id === selectedBranchId) ?? data?.content[0]
  const effectiveSelectedBranchId = selectedBranch?.id ?? null
  const courts: Court[] = []

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#111827]">
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <h1 className="text-[32px] font-bold tracking-tight">Quản lý cơ sở</h1>

        {successMessage && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          >
            {successMessage}
          </div>
        )}

        {deleteMutation.isError && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          >
            {getBranchErrorMessage(deleteMutation.error)}
          </div>
        )}

        <section aria-label="Tìm kiếm và chọn cơ sở" className="mt-6">
          <div className="flex items-center gap-3">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Tìm kiếm cơ sở</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#6B7280]"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Tìm kiếm cơ sở..."
                className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-12 pr-4 text-sm outline-none transition duration-200 placeholder:text-[#9CA3AF] focus:border-[#10B981] focus:ring-4 focus:ring-emerald-100"
              />
            </label>
            <button
              type="button"
              aria-label="Mở bộ lọc"
              aria-expanded={showFilters}
              onClick={() => setShowFilters((current) => !current)}
              className={`grid size-12 shrink-0 place-items-center rounded-xl border bg-white transition duration-200 hover:border-[#10B981] hover:text-[#059669] ${
                showFilters
                  ? 'border-[#10B981] text-[#059669] shadow-sm'
                  : 'border-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              <SlidersHorizontal aria-hidden="true" className="size-5" />
            </button>
            <Link
              to="/branches/new"
              aria-label="Thêm cơ sở"
              className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#10B981] text-white shadow-sm transition duration-200 hover:bg-[#059669] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <Plus aria-hidden="true" className="size-6" />
            </Link>
          </div>

          {showFilters && (
            <div className="mt-3 grid gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm sm:grid-cols-3">
              <FilterSelect
                label="Sắp xếp theo"
                value={sortField}
                onChange={(value) => {
                  setSortField(value as BranchSortField)
                  setPage(0)
                }}
                options={sortOptions}
              />
              <FilterSelect
                label="Thứ tự"
                value={sortDirection}
                onChange={(value) => {
                  setSortDirection(value as SortDirection)
                  setPage(0)
                }}
                options={[
                  { value: 'asc', label: 'Tăng dần' },
                  { value: 'desc', label: 'Giảm dần' },
                ]}
              />
              <FilterSelect
                label="Số cơ sở mỗi trang"
                value={String(size)}
                onChange={(value) => {
                  setSize(Number(value))
                  setPage(0)
                }}
                options={[5, 10, 20, 50].map((value) => ({
                  value: String(value),
                  label: String(value),
                }))}
              />
            </div>
          )}

          {branchQuery.isPending ? (
            <StatePanel title="Đang tải danh sách cơ sở..." />
          ) : branchQuery.isError ? (
            <StatePanel
              title="Không thể tải danh sách cơ sở"
              description={getBranchErrorMessage(branchQuery.error)}
              actionLabel="Thử lại"
              onAction={() => void branchQuery.refetch()}
            />
          ) : !data || data.content.length === 0 ? (
            <StatePanel
              title="Chưa có cơ sở đang hoạt động"
              description="Thêm cơ sở đầu tiên để bắt đầu quản lý."
            />
          ) : filteredBranches.length === 0 ? (
            <StatePanel
              title="Không tìm thấy cơ sở"
              description="Hãy thử một tên hoặc địa chỉ khác."
            />
          ) : (
            <div className="mt-5 flex snap-x gap-4 overflow-x-auto pb-3 pt-1">
              {filteredBranches.map((branch) => {
                const isSelected = branch.id === effectiveSelectedBranchId
                const isDeleting =
                  deleteMutation.isPending && deleteMutation.variables === branch.id
                return (
                  <article
                    key={branch.id}
                    className={`relative min-w-40 snap-start overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      isSelected ? 'border-[#10B981]' : 'border-transparent'
                    }`}
                  >
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedBranchId(branch.id)}
                      className="block w-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-200"
                    >
                      <div className="px-4 py-3 pr-12">
                        <p className="truncate text-lg font-bold">{branch.name}</p>
                        <p className="mt-1 text-sm text-[#6B7280]">0 sân</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      aria-label={`Xóa cơ sở ${branch.name}`}
                      title="Xóa cơ sở"
                      disabled={deleteMutation.isPending}
                      onClick={() => handleDelete(branch)}
                      className="absolute bottom-3 right-3 z-10 grid size-8 place-items-center rounded-full text-red-500 transition duration-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2
                        aria-hidden="true"
                        className={`size-4 ${isDeleting ? 'animate-pulse' : ''}`}
                      />
                    </button>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        {selectedBranch && (
          <>
            <BranchDetailCard branch={selectedBranch} courtCount={courts.length} />
            <CourtList courts={courts} />
          </>
        )}

        {data && data.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between gap-3 text-sm text-[#6B7280]">
            <button
              type="button"
              disabled={data.first || branchQuery.isFetching}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 font-semibold text-[#111827] hover:border-[#10B981] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Trang trước
            </button>
            <span className="font-medium">
              Trang {data.number + 1}/{data.totalPages}
            </span>
            <button
              type="button"
              disabled={data.last || branchQuery.isFetching}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 font-semibold text-[#111827] hover:border-[#10B981] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Trang sau
            </button>
          </div>
        )}
      </main>

    </div>
  )
}

type BranchDetailCardProps = {
  branch: Branch
  courtCount: number
}

function BranchDetailCard({ branch, courtCount }: BranchDetailCardProps) {
  return (
    <section className="relative mt-7 rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
      <Link
        to={`/branches/${branch.id}/edit`}
        aria-label={`Chỉnh sửa ${branch.name}`}
        className="absolute right-5 top-5 grid size-10 place-items-center rounded-full text-[#6B7280] transition duration-200 hover:bg-emerald-50 hover:text-[#059669] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
      >
        <Pencil aria-hidden="true" className="size-5" />
      </Link>
      <h2 className="pr-14 text-[28px] font-bold tracking-tight">{branch.name}</h2>
      <div className="mt-5 space-y-3 text-sm text-[#6B7280] sm:text-base">
        <p className="flex items-start gap-3">
          <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#10B981]" />
          <span>{formatAddress(branch)}</span>
        </p>
        <p className="flex items-center gap-3">
          <Clock aria-hidden="true" className="size-5 shrink-0 text-[#10B981]" />
          <span>
            {formatTime(branch.openTime)} - {formatTime(branch.closeTime)}
          </span>
        </p>
      </div>
      <div className="my-6 h-px bg-[#E5E7EB]" />
      <div className="flex items-center gap-4 text-sm">
        <span className="rounded-full bg-[#E5E7EB] px-3 py-1.5 font-semibold text-[#6B7280]">
          {branch.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm đóng'}
        </span>
        <span className="text-[#6B7280]">{courtCount} sân</span>
      </div>
    </section>
  )
}

type CourtListProps = {
  courts: Court[]
}

function CourtList({ courts }: CourtListProps) {
  return (
    <section className="mt-8" aria-labelledby="court-list-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="court-list-title" className="text-2xl font-bold">
          Danh sách sân ({courts.length})
        </h2>
        <button
          type="button"
          aria-label="Thêm sân"
          className="shrink-0 rounded-lg px-2 py-2 text-sm font-bold text-[#10B981] transition duration-200 hover:bg-emerald-50 hover:text-[#059669]"
        >
          + Thêm sân
        </button>
      </div>

      {courts.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-[#D1D5DB] bg-white px-6 py-12 text-center">
          <p className="font-semibold text-[#111827]">Chưa có dữ liệu sân</p>
          <p className="mt-1 text-sm text-[#6B7280]">
            Danh sách sân sẽ xuất hiện khi API sân được kết nối.
          </p>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-[#E5E7EB] rounded-2xl bg-white px-5 shadow-sm">
          {courts.map((court) => (
            <article key={court.id} className="flex items-center gap-4 py-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold">{court.name}</h3>
                  <span className="rounded-full bg-[#E5E7EB] px-2.5 py-1 text-xs font-semibold text-[#6B7280]">
                    {court.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm đóng'}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs text-[#6B7280]">
                    {court.sportType}
                  </span>
                  <span className="font-semibold text-[#10B981]">
                    {court.hourlyPrice.toLocaleString('vi-VN')}đ/giờ
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Chỉnh sửa ${court.name}`}
                className="grid size-10 shrink-0 place-items-center rounded-full text-[#6B7280] hover:bg-emerald-50 hover:text-[#059669]"
              >
                <Pencil aria-hidden="true" className="size-5" />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

type FilterSelectProps = {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="space-y-1.5 text-sm font-semibold text-[#374151]">
      <span className="block">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 font-normal outline-none focus:border-[#10B981] focus:ring-4 focus:ring-emerald-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

type StatePanelProps = {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

function StatePanel({ title, description, actionLabel, onAction }: StatePanelProps) {
  return (
    <div className="mt-5 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-16 text-center shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      {description && (
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#6B7280]">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-[#10B981] px-4 py-2 text-sm font-bold text-white hover:bg-[#059669]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
