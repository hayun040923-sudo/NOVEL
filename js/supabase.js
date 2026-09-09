const SUPABASE_URL = "https://jhwkbdhthtqcrbizherp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JAq4EornaeyWie3CjO5cyg_iTNpD9A_";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// ==============================
// 사이트 접속자 기록
// ==============================

function getVisitorId() {
    let visitorId = localStorage.getItem("novel_visitor_id");

    if (!visitorId) {
        visitorId =
            crypto.randomUUID
                ? crypto.randomUUID()
                : "visitor-" + Date.now() + "-" + Math.random().toString(36).slice(2);

        localStorage.setItem("novel_visitor_id", visitorId);
    }

    return visitorId;
}


async function recordSiteVisit() {
    try {
        const visitorId = getVisitorId();

        // 너무 짧은 시간에 페이지를 여러 번 이동해도
        // 계속 접속자로 기록되지 않도록 30분마다 1회 기록
        const lastVisit = localStorage.getItem("novel_last_visit");
        const now = Date.now();

        if (lastVisit && now - Number(lastVisit) < 30 * 60 * 1000) {
            return;
        }

        const { error } = await supabaseClient
            .from("site_visits")
            .insert({
                visitor_id: visitorId
            });

        if (error) {
            console.error("접속 기록 저장 실패:", error);
            return;
        }

        localStorage.setItem("novel_last_visit", String(now));

    } catch (error) {
        console.error("접속자 기록 오류:", error);
    }
}


// 페이지가 열리면 자동으로 접속 기록
recordSiteVisit();
