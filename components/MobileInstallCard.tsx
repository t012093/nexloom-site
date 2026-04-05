import React from 'react';
import { ArrowUpRight, Download, LucideIcon, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Button from './Button';

interface MobileInstallCardProps {
  platform: 'ios' | 'android';
  icon: LucideIcon;
  status: string;
  title: string;
  description: string;
  steps: string[];
  label?: string;
  note?: string;
  url?: string | null;
  ctaLabel?: string;
  qrTitle?: string;
  qrCaption?: string;
}

const styles = {
  ios: {
    shell:
      'border-slate-200 bg-[linear-gradient(160deg,rgba(248,250,252,0.96)_0%,rgba(255,255,255,0.98)_62%,rgba(241,245,249,0.95)_100%)] shadow-[0_28px_70px_-32px_rgba(15,23,42,0.28)]',
    badge: 'border-slate-200 bg-white text-slate-700',
    icon: 'bg-slate-950 text-white shadow-[0_18px_45px_-20px_rgba(15,23,42,0.8)]',
    step: 'border-slate-200 bg-white text-slate-700',
    qr: 'border-slate-200 bg-white',
    qrInner: 'bg-slate-50',
    hint: 'text-slate-500',
    buttonShadow: 'shadow-slate-200',
  },
  android: {
    shell:
      'border-emerald-200 bg-[linear-gradient(160deg,rgba(236,253,245,0.96)_0%,rgba(255,255,255,0.98)_58%,rgba(239,246,255,0.95)_100%)] shadow-[0_28px_70px_-32px_rgba(16,185,129,0.34)]',
    badge: 'border-emerald-200 bg-white text-emerald-700',
    icon: 'bg-emerald-600 text-white shadow-[0_18px_45px_-20px_rgba(16,185,129,0.65)]',
    step: 'border-emerald-100 bg-white text-emerald-700',
    qr: 'border-emerald-100 bg-white',
    qrInner: 'bg-emerald-50/60',
    hint: 'text-slate-500',
    buttonShadow: 'shadow-emerald-200',
  },
} as const;

const MobileInstallCard: React.FC<MobileInstallCardProps> = ({
  platform,
  icon: Icon,
  status,
  title,
  description,
  steps,
  label,
  note,
  url,
  ctaLabel,
  qrTitle,
  qrCaption,
}) => {
  const theme = styles[platform];
  const platformName = platform === 'ios' ? 'iPhone / iPad' : 'Android';

  return (
    <div className={`rounded-[2.25rem] border p-7 md:p-8 ${theme.shell}`}>
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black ${theme.badge}`}>
            <Icon size={16} />
            <span>{platform === 'ios' ? 'iOS' : 'Android'}</span>
            <span className="text-slate-400">/</span>
            <span>{status}</span>
          </div>

          <div className="mb-6 flex items-start gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.icon}`}>
              <Icon size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900">{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{description}</p>
            </div>
          </div>

          {label && (
            <div className="mb-6 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
              {label}
            </div>
          )}

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-black ${theme.step}`}>
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-slate-700">{step}</p>
              </div>
            ))}
          </div>

          {note && <p className={`mt-5 text-sm leading-relaxed ${theme.hint}`}>{note}</p>}

          {url && ctaLabel && (
            <a href={url} className="mt-7 inline-flex" aria-label={`${platformName} のインストールリンクを開く`}>
              <Button
                size="lg"
                className={`rounded-2xl px-8 ${theme.buttonShadow}`}
                icon={<Download size={18} />}
              >
                {ctaLabel}
              </Button>
            </a>
          )}
        </div>

        <div className={`mx-auto w-full max-w-[244px] rounded-[1.8rem] border p-5 xl:mx-0 ${theme.qr}`}>
          {url ? (
            <>
              <div className="mb-4 text-center">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Scan</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{qrTitle ?? `${platformName} で開く`}</p>
              </div>
              <div className={`flex justify-center rounded-2xl p-4 ${theme.qrInner}`}>
                <QRCodeSVG value={url} size={156} includeMargin level="M" />
              </div>
              <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
                {qrCaption ?? 'PC でこのページを開き、端末側で QR を読み取ってインストールページへ進みます。'}
              </p>
            </>
          ) : (
            <div className="flex min-h-[252px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 px-5 text-center">
              <div className="mb-4 rounded-2xl bg-slate-100 p-3 text-slate-500">
                <QrCode size={24} />
              </div>
              <p className="text-sm font-bold text-slate-900">QR は公開リンクがある場合のみ表示します</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                今は配布案内または招待リンクから導入してください。
              </p>
            </div>
          )}

          {url && (
            <a
              href={url}
              className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-slate-700 hover:text-slate-900"
            >
              リンクを別タブで開く
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileInstallCard;
