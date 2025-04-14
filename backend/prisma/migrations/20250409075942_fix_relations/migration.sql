BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[DeTai] (
    [sMaDeTai] NVARCHAR(1000) NOT NULL,
    [sTenDeTai] NVARCHAR(1000) NOT NULL,
    [sLinhVuc] NVARCHAR(1000) NOT NULL,
    [sMaLoaiDeTai] NVARCHAR(1000) NOT NULL,
    [sMaNhaNghienCuu] NVARCHAR(1000) NOT NULL,
    [sTrangThai] NVARCHAR(1000) NOT NULL,
    [sMoTa] NVARCHAR(1000),
    [dNgayBatDau] DATETIME2 NOT NULL,
    [dNgayKetThuc] DATETIME2 NOT NULL,
    [sLoaiToChuc] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [DeTai_pkey] PRIMARY KEY CLUSTERED ([sMaDeTai])
);

-- CreateTable
CREATE TABLE [dbo].[LoaiToChuc] (
    [sLoaiToChuc] NVARCHAR(1000) NOT NULL,
    [sTenLoaiToChuc] NVARCHAR(1000) NOT NULL,
    [sMoTa] NVARCHAR(1000),
    CONSTRAINT [LoaiToChuc_pkey] PRIMARY KEY CLUSTERED ([sLoaiToChuc])
);

-- CreateTable
CREATE TABLE [dbo].[LoaiDeTai] (
    [sMaLoaiDeTai] NVARCHAR(1000) NOT NULL,
    [sTenLoaiDeTai] NVARCHAR(1000) NOT NULL,
    [sMoTa] NVARCHAR(1000),
    CONSTRAINT [LoaiDeTai_pkey] PRIMARY KEY CLUSTERED ([sMaLoaiDeTai])
);

-- CreateTable
CREATE TABLE [dbo].[BaoCaoThongKe] (
    [sMaBaoCao] NVARCHAR(1000) NOT NULL,
    [sLoaiBaoCao] NVARCHAR(1000) NOT NULL,
    [dNgayTao] DATETIME2 NOT NULL,
    CONSTRAINT [BaoCaoThongKe_pkey] PRIMARY KEY CLUSTERED ([sMaBaoCao])
);

-- CreateTable
CREATE TABLE [dbo].[LoaiBaoCao] (
    [sLoaiBaoCao] NVARCHAR(1000) NOT NULL,
    [sTenLoaiBaoCao] NVARCHAR(1000) NOT NULL,
    [sMoTa] NVARCHAR(1000),
    CONSTRAINT [LoaiBaoCao_pkey] PRIMARY KEY CLUSTERED ([sLoaiBaoCao])
);

-- CreateTable
CREATE TABLE [dbo].[ChiTietBaoCaoThongKe] (
    [sMaChiTietBaoCao] NVARCHAR(1000) NOT NULL,
    [sMaBaoCao] NVARCHAR(1000) NOT NULL,
    [sNoiDung] NVARCHAR(1000) NOT NULL,
    [fGiaTri] FLOAT(53) NOT NULL,
    [sMaDoiTuongThongKe] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ChiTietBaoCaoThongKe_pkey] PRIMARY KEY CLUSTERED ([sMaChiTietBaoCao])
);

-- CreateTable
CREATE TABLE [dbo].[DoiTuongThongKe] (
    [sMaDoiTuongThongKe] NVARCHAR(1000) NOT NULL,
    [sTenDoiTuongThongKe] NVARCHAR(1000) NOT NULL,
    [sMoTa] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [DoiTuongThongKe_pkey] PRIMARY KEY CLUSTERED ([sMaDoiTuongThongKe])
);

-- CreateTable
CREATE TABLE [dbo].[ThanhVienHoiDong] (
    [sMaThanhVien] NVARCHAR(1000) NOT NULL,
    [sTenThanhVien] NVARCHAR(1000) NOT NULL,
    [sMaHoiDongKhoaHoc] NVARCHAR(1000) NOT NULL,
    [sMaTrinhDoHocVan] NVARCHAR(1000) NOT NULL,
    [sLoaiThanhVien] NVARCHAR(1000) NOT NULL,
    [sVaiTro] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ThanhVienHoiDong_pkey] PRIMARY KEY CLUSTERED ([sMaThanhVien])
);

-- CreateTable
CREATE TABLE [dbo].[DanhGiaDeTai] (
    [sMaDanhGia] NVARCHAR(1000) NOT NULL,
    [sMaHoiDong] NVARCHAR(1000) NOT NULL,
    [sMaDeTai] NVARCHAR(1000) NOT NULL,
    [sMaThanhVien] NVARCHAR(1000) NOT NULL,
    [dNgayDanhGia] DATETIME2 NOT NULL,
    [sNhanXet] NVARCHAR(1000),
    [iDiemSo] INT NOT NULL,
    CONSTRAINT [DanhGiaDeTai_pkey] PRIMARY KEY CLUSTERED ([sMaDanhGia])
);

-- CreateTable
CREATE TABLE [dbo].[HoiDongKhoaHoc] (
    [sMaHoiDong] NVARCHAR(1000) NOT NULL,
    [sTenHoiDong] NVARCHAR(1000) NOT NULL,
    [sChucNang] NVARCHAR(1000) NOT NULL,
    [sDanhGia] NVARCHAR(1000) NOT NULL,
    [sLoaiToChuc] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [HoiDongKhoaHoc_pkey] PRIMARY KEY CLUSTERED ([sMaHoiDong])
);

-- CreateTable
CREATE TABLE [dbo].[SuKien] (
    [sMaSuKien] NVARCHAR(1000) NOT NULL,
    [sTenSuKien] NVARCHAR(1000) NOT NULL,
    [dThoiGian] DATETIME2 NOT NULL,
    [sDiaDiem] NVARCHAR(1000) NOT NULL,
    [sNoiDung] NVARCHAR(1000) NOT NULL,
    [sTenDienGia] NVARCHAR(1000) NOT NULL,
    [sKinhPhi] NVARCHAR(1000) NOT NULL,
    [sMaLoaiSuKien] NVARCHAR(1000) NOT NULL,
    [sMaLoaiToChuc] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SuKien_pkey] PRIMARY KEY CLUSTERED ([sMaSuKien])
);

-- CreateTable
CREATE TABLE [dbo].[LoaiSuKien] (
    [sMaLoaiSuKien] NVARCHAR(1000) NOT NULL,
    [sTenLoaiSuKien] NVARCHAR(1000) NOT NULL,
    [sMoTa] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [LoaiSuKien_pkey] PRIMARY KEY CLUSTERED ([sMaLoaiSuKien])
);

-- CreateTable
CREATE TABLE [dbo].[SinhVien] (
    [sMaSinhVien] NVARCHAR(1000) NOT NULL,
    [sTenSinhVien] NVARCHAR(1000) NOT NULL,
    [sGioiTinh] NVARCHAR(1000) NOT NULL,
    [sEmail] NVARCHAR(1000) NOT NULL,
    [sNganhHoc] NVARCHAR(1000) NOT NULL,
    [sNienKhoa] NVARCHAR(1000) NOT NULL,
    [sMaTrinhDoHocVan] NVARCHAR(1000) NOT NULL,
    [sQuyenHan] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SinhVien_pkey] PRIMARY KEY CLUSTERED ([sMaSinhVien])
);

-- CreateTable
CREATE TABLE [dbo].[TaiLieu] (
    [sMaLoaiTaiLieu] NVARCHAR(1000) NOT NULL,
    [sTenTaiLieu] NVARCHAR(1000) NOT NULL,
    [sTenTacGia] NVARCHAR(1000) NOT NULL,
    [dNgayXuatBan] DATETIME2 NOT NULL,
    [sLinhVuc] NVARCHAR(1000) NOT NULL,
    [sMaDeTai] NVARCHAR(1000) NOT NULL,
    [sMaLoaiDeTai] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TaiLieu_pkey] PRIMARY KEY CLUSTERED ([sMaLoaiTaiLieu])
);

-- CreateTable
CREATE TABLE [dbo].[TrinhDoHocVan] (
    [sMaTrinhDoHocVan] NVARCHAR(1000) NOT NULL,
    [sTenTrinhDoHocVan] NVARCHAR(1000) NOT NULL,
    [sMoTa] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TrinhDoHocVan_pkey] PRIMARY KEY CLUSTERED ([sMaTrinhDoHocVan])
);

-- AddForeignKey
ALTER TABLE [dbo].[DeTai] ADD CONSTRAINT [FK_DeTai_LoaiToChuc] FOREIGN KEY ([sLoaiToChuc]) REFERENCES [dbo].[LoaiToChuc]([sLoaiToChuc]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DeTai] ADD CONSTRAINT [FK_DeTai_LoaiDeTai] FOREIGN KEY ([sMaLoaiDeTai]) REFERENCES [dbo].[LoaiDeTai]([sMaLoaiDeTai]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BaoCaoThongKe] ADD CONSTRAINT [FK_BaoCao_LoaiBaoCao] FOREIGN KEY ([sLoaiBaoCao]) REFERENCES [dbo].[LoaiBaoCao]([sLoaiBaoCao]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
