import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold tracking-wide text-primary-700 uppercase">Legal</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900">利用規約</h1>
          <p className="mt-3 text-sm text-slate-500">最終更新日: 2026-03-06</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8 text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">第1条（適用）</h2>
            <p>
              本規約は、Nexloom（以下「本サービス」）の利用条件を定めるものです。利用者は、本規約に同意のうえ本サービスを利用するものとします。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">第2条（アカウント）</h2>
            <p>
              利用者は、登録情報を正確かつ最新に保ち、アカウント情報を自己の責任で管理するものとします。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">第3条（禁止事項）</h2>
            <p>
              法令または公序良俗に違反する行為、不正アクセス、他者の権利侵害、本サービス運営を妨害する行為を禁止します。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">第4条（Energyの取り扱い）</h2>
            <p>
              本サービス内で表示・付与されるEnergy（ポイントを含む）は、サービス内機能の利用を目的とした内部指標であり、法定通貨ではありません。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Energyは換金（払戻し・現金化）できません。</li>
              <li>Energyはユーザー間で移転・譲渡できません。</li>
              <li>Energyは外部サービスのポイントや資産との交換を想定しません。</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">第5条（サービス変更・停止）</h2>
            <p>
              本サービスは、保守・障害対応・改善等のため、機能の変更または提供を一時停止する場合があります。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">第6条（免責）</h2>
            <p>
              本サービスの提供にあたり合理的な注意を払いますが、特定目的適合性、完全性、継続性を保証するものではありません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">第7条（規約変更）</h2>
            <p>
              本規約は、必要に応じて改定されることがあります。重要な変更は、適切な方法で告知します。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
