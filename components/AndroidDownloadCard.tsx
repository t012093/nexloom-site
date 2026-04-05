import React from 'react';
import { Download, Play } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Button from './Button';

interface AndroidDownloadCardProps {
  url: string;
  label?: string;
  title?: string;
  description?: string;
}

const AndroidDownloadCard: React.FC<AndroidDownloadCardProps> = ({
  url,
  label = 'Android preview APK',
  title = 'Android APK をこのサイトから配布',
  description = 'Pixel などの Android 端末では、ボタンまたは QR コードから APK を開いて直接インストールできます。',
}) => {
  return (
    <div className="rounded-[2rem] border border-emerald-200 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_46%,#eff6ff_100%)] p-7 shadow-[0_24px_60px_-24px_rgba(16,185,129,0.35)]">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-bold text-emerald-700">
            <Play size={16} />
            <span>Android Direct Download</span>
          </div>
          <h3 className="mb-3 text-2xl font-black text-slate-900">{title}</h3>
          <p className="mb-5 text-slate-600 leading-relaxed">{description}</p>
          <div className="mb-6 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-white px-3 py-1.5">{label}</span>
            <span className="rounded-full bg-white px-3 py-1.5">QR でスマホへ送信</span>
            <span className="rounded-full bg-white px-3 py-1.5">同じ URL を共有可能</span>
          </div>
          <a href={url} className="inline-flex" aria-label="Android APK をダウンロード">
            <Button size="lg" className="rounded-2xl px-8 shadow-lg shadow-emerald-200" icon={<Download size={18} />}>
              Android APK をダウンロード
            </Button>
          </a>
        </div>

        <div className="mx-auto w-full max-w-[240px] rounded-[1.75rem] border border-white bg-white p-5 shadow-lg md:mx-0">
          <div className="mb-4 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Scan</p>
            <p className="mt-1 text-sm font-bold text-slate-900">Android 端末で開く</p>
          </div>
          <div className="flex justify-center rounded-2xl bg-slate-50 p-4">
            <QRCodeSVG value={url} size={160} includeMargin level="M" />
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
            PC でこのページを開き、Pixel で QR を読み取って APK の取得ページへ進みます。
          </p>
        </div>
      </div>
    </div>
  );
};

export default AndroidDownloadCard;
