import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, LayoutGrid, Search, X } from 'lucide-react'
import './App.css'

const homeScreen = 'trang_ch_d_t_ngu_n'

function App() {
  const [screens, setScreens] = useState([])
  const [activeId, setActiveId] = useState(homeScreen)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/screens.json')
      .then((response) => response.json())
      .then((items) => setScreens(items))
  }, [])

  useEffect(() => {
    const handleScreenRoute = (event) => {
      if (event.data?.type !== 'stitch-route') return
      const route = event.data.value
      const aliases = {
        'trang-chu': 'trang_ch_d_t_ngu_n',
        'bo-suu-tap': 'danh_m_c_s_n_ph_m_d_t_ngu_n_1',
        'danh-muc-san-pham': 'danh_m_c_s_n_ph_m_d_t_ngu_n_1',
        'danh-muc-va-san-pham': 'adm_003_qu_n_l_danh_m_c_tr_nh_so_n_bi_n_th_d_t_ngu_n_admin',
        'cau-chuyen-di-san': 'c_u_chuy_n_di_s_n_d_t_ngu_n_kh_p_h_n_nh_banner_qr',
        'chi-tiet-san-pham': 'chi_ti_t_s_n_ph_m_za_r_d_t_ngu_n',
        'gio-hang': 'gi_h_ng_qu_t_ng_d_t_ngu_n',
        'thong-tin-giao-hang': 'th_ng_tin_giao_h_ng_d_t_ngu_n',
        'xac-nhan-don': 'x_c_nh_n_n_order_confirmation_d_t_ngu_n',
        'lich-su-don-hang': 'l_ch_s_n_order_history_d_t_ngu_n_1',
        'order-history': 'l_ch_s_n_order_history_d_t_ngu_n_1',
        'dang-ky-va-xac-minh': 'ng_k_x_c_minh_d_t_ngu_n',
        'dang-nhap': 'ng_nh_p_s_di_s_n_d_t_ngu_n',
        'dang-nhap-so-di-san': 'ng_nh_p_s_di_s_n_d_t_ngu_n',
        'dang-xuat': 'trang_ch_d_t_ngu_n',
        'doi-tra-hoan-tien': 't_o_y_u_c_u_i_tr_ph_c_ch_di_s_n_d_t_ngu_n',
        'don-hang-kien-di-san': 'chi_ti_t_tracking_n_order_detail_tracking_d_t_ngu_n_1',
        'tra-cuu': 'tra_c_u_n_guest_d_t_ngu_n',
        'tra-cuu-don-guest': 'tra_c_u_n_guest_d_t_ngu_n',
        'tra-cuu-don-hang': 'chi_ti_t_tracking_n_order_detail_tracking_d_t_ngu_n_1',
        'ho-tro': 'li_n_h_h_tr_ti_p_nh_n_di_s_n_support_request_d_t_ngu_n',
        'ho-so-nghe-nhan-xuong-det': 'h_s_c_nh_n_d_t_ngu_n',
        'minh-bach-nguon-goc': 'h_s_ngu_n_g_c_c_ng_khai_public_provenance_d_t_ngu_n',
        'nguon-goc-cap-ma-qr': 'adm_023_li_n_k_t_truy_v_t_ngu_n_g_c_ph_t_h_nh_m_qr_nh_t_k_xu_t_b_n_d_t_ngu_n',
        'kiem-dinh-ocop-cap-qr': 'adm_023_li_n_k_t_truy_v_t_ngu_n_g_c_ph_t_h_nh_m_qr_nh_t_k_xu_t_b_n_d_t_ngu_n',
        'kiem-dinh-ocop-qc': 'adm_013_qc_evidence_ki_m_k_d_t_ngu_n_admin',
        'kiem-dinh-ocop-va-qc': 'adm_013_qc_evidence_ki_m_k_d_t_ngu_n_admin',
        'cham-soc-khach-hang-ticket': 'adm_019_h_p_th_a_k_nh_qu_n_l_ticket_tri_th_c_d_t_ngu_n_admin',
        'khach-hang-cskh': 'adm_018_customer_360_th_m_tra_h_p_nh_t_nh_danh_d_t_ngu_n_admin',
        'khach-hang-cskh-omnichannel': 'adm_019_h_p_th_a_k_nh_qu_n_l_ticket_tri_th_c_d_t_ngu_n_admin',
        'kenh-ban-bundle': 'adm_006_bundle_phi_n_b_n_a_k_nh_d_t_ngu_n_admin',
        'kenh-ban-va-bundle': 'adm_006_bundle_phi_n_b_n_a_k_nh_d_t_ngu_n_admin',
        'dong-goi-giao-nhan': 'adm_016_ng_g_i_in_nh_n_b_n_giao_d_t_ngu_n_admin',
        'don-hang-da-kenh-oms': 'adm_008_danh_s_ch_n_h_ng_a_k_nh_d_t_ngu_n_admin',
        'kho-vai-vat-tu-cuom': 'adm_012_nh_p_h_ng_l_v_tr_atp_d_t_ngu_n_admin',
        'kho-van-ton-kho': 'adm_012_nh_p_h_ng_l_v_tr_atp_d_t_ngu_n_admin',
        'kho-van-va-quan-tri-ton-kho': 'adm_012_nh_p_h_ng_l_v_tr_atp_d_t_ngu_n_admin',
        'nhan-su-phan-quyen': 'adm_002_qu_n_tr_nh_n_vi_n_phi_n_truy_c_p_d_t_ngu_n_admin',
        'nhan-su-va-phan-quyen': 'adm_002_qu_n_tr_nh_n_vi_n_phi_n_truy_c_p_d_t_ngu_n_admin',
        'quan-tri-ai-tri-thuc': 'adm_007_qu_n_tr_ai_tri_th_c_guardrail_d_t_ngu_n_admin',
        'quan-tri-ai-va-tri-thuc': 'adm_007_qu_n_tr_ai_tri_th_c_guardrail_d_t_ngu_n_admin',
        'quan-tri-du-lieu-review': 'adm_029_ki_m_duy_t_nh_gi_kh_ch_h_ng_d_t_ngu_n_admin',
        'ra-soat-thanh-toan': 'r_so_t_thanh_to_n_review_payment_d_t_ngu_n',
        'tai-chinh-doi-soat-pl': 'adm_024_i_so_t_t_i_ch_nh_kh_p_d_li_u_s_n_x_l_ngo_i_l_d_t_ngu_n_admin',
        'phan-tich-dss': 'adm_027_c_nh_b_o_ra_quy_t_nh_dss_d_t_ngu_n_admin',
        'tai-khoan': 'h_s_c_nh_n_d_t_ngu_n',
        'so-di-san-tai-khoan': 'h_s_c_nh_n_d_t_ngu_n',
        'nhat-ky-audit-an-ninh': 'adm_005_claim_ch_ng_nh_n_provenance_review_d_t_ngu_n_admin',
        'nhat-ky-audit-bao-mat': 'b_o_m_t_t_i_kho_n_account_security_d_t_ngu_n',
        'nhat-ky-audit-va-an-ninh': 'b_o_m_t_t_i_kho_n_account_security_d_t_ngu_n',
        'governance-phap-che': 'adm_005_claim_ch_ng_nh_n_provenance_review_d_t_ngu_n_admin',
        'governance-va-phap-che': 'adm_005_claim_ch_ng_nh_n_provenance_review_d_t_ngu_n_admin',
        'khoa-phien-lam-viec': 'b_o_m_t_t_i_kho_n_account_security_d_t_ngu_n',
        'khong-gian-workshop': 'h_s_c_nh_n_d_t_ngu_n',
        'so-dia-chi': 'h_s_c_nh_n_d_t_ngu_n',
        'so-di-san-so': 'h_s_ngu_n_g_c_c_ng_khai_public_provenance_d_t_ngu_n',
        'thong-bao': 'th_ng_tin_giao_h_ng_d_t_ngu_n',
        'tong-quan-dieu-hanh': 'adm_025_b_o_c_o_ng_g_p_p_l_a_k_nh_ch_t_k_k_to_n_xu_t_d_li_u_d_t_ngu_n_admin',
        'tro-ly-ai': 'tr_l_ch_n_s_n_ph_m_ai_assistant_d_t_ngu_n',
      }
      const targetId = aliases[route] ?? route
      const target = screens.find((screen) => screen.id === targetId || screen.id.includes(targetId))
      if (target) setActiveId(target.id)
    }

    window.addEventListener('message', handleScreenRoute)
    return () => window.removeEventListener('message', handleScreenRoute)
  }, [screens])

  const filteredScreens = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return screens
    return screens.filter((screen) => screen.label.toLowerCase().includes(normalizedQuery))
  }, [query, screens])

  const activeScreen = screens.find((screen) => screen.id === activeId) ?? screens[0]

  return (
    <div className="screen-browser">
      <aside className="screen-sidebar">
        <div className="shell-brand"><span className="brand-mark">DN</span><div><strong>Dệt Nguồn</strong><small>Stitch screen library</small></div></div>
        <label className="screen-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm màn hình..." /><kbd>{screens.length}</kbd></label>
        <div className="screen-list-heading"><span>Màn hình trong ZIP</span><span>{filteredScreens.length}</span></div>
        <nav className="screen-list">{filteredScreens.map((screen) => <button className={screen.id === activeScreen?.id ? 'screen-item active' : 'screen-item'} key={screen.id} onClick={() => setActiveId(screen.id)}><LayoutGrid size={14} /><span>{screen.label}</span></button>)}</nav>
        <p className="sidebar-note">Source được lấy trực tiếp từ file ZIP Stitch. Shell này chỉ điều phối preview, không thay đổi mã màn hình gốc.</p>
      </aside>
      <main className="screen-stage">
        <header className="stage-header"><div><span className="stage-kicker">PREVIEW / REACT SHELL</span><h1>{activeScreen?.label ?? 'Đang tải màn hình...'}</h1></div><div className="stage-actions">{activeScreen && <a className="open-screen" href={activeScreen.path} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Mở source</a>}<button className="close-shell" type="button" title="Xóa tìm kiếm" onClick={() => setQuery('')}><X size={16} /></button></div></header>
        <section className="screen-frame-wrap">{activeScreen ? <iframe key={activeScreen.path} className="screen-frame" title={activeScreen.label} src={activeScreen.path} /> : <div className="loading">Đang tải 56 màn hình từ ZIP...</div>}</section>
      </main>
    </div>
  )
}

export default App
