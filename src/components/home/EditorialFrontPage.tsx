import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';

interface EditorialFrontPageProps {
  articles: any[];
}

function imgOf(a: any) {
  return a?.image_url || '/placeholder.svg';
}
function titleOf(a: any) {
  return a?.title || 'Untitled';
}
function slugOf(a: any) {
  return a?.slug || '';
}
function dateOf(a: any) {
  const d = a?.date ? new Date(a.date) : null;
  return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
}
function categoryOf(a: any) {
  return a?.category || 'Business';
}
function excerptOf(a: any) {
  return a?.excerpt || '';
}

const EditorialFrontPage = ({ articles = [] }: EditorialFrontPageProps) => {
  const sorted = Array.isArray(articles)
    ? [...articles].sort((a, b) => new Date(b?.date || 0).getTime() - new Date(a?.date || 0).getTime())
    : [];
  const main = sorted[0];
  const secondary = sorted.slice(1, 3);
  const headlines = sorted.slice(3, 9);
  const mostRead = [...sorted]
    .filter(Boolean)
    .slice(0, 6);

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left rail: latest/most read */}
          <aside className="order-2 lg:order-1 space-y-8">
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-200 font-semibold uppercase tracking-wide text-sm text-insightBlack">Most Read</div>
              <ul className="divide-y divide-gray-200">
                {mostRead.map((a, i) => (
                  <li key={slugOf(a) + i} className="p-4 hover:bg-white transition">
                    <Link to={`/article/${slugOf(a)}`} className="flex gap-3 group">
                      <img src={imgOf(a)} alt={titleOf(a)} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">{categoryOf(a)}</div>
                        <h4 className="font-semibold group-hover:text-insightRed line-clamp-2">{titleOf(a)}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3" /> {dateOf(a)}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center: Main feature */}
          <div className="order-1 lg:order-2 space-y-6">
            {main && (
              <Link to={`/article/${slugOf(main)}`} className="block group overflow-hidden rounded-2xl shadow-lg">
                <div className="relative aspect-[16/9]">
                  <img src={imgOf(main)} alt={titleOf(main)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <div className="inline-flex px-3 py-1 rounded bg-insightRed text-white text-xs font-bold mb-3">{categoryOf(main)}</div>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">{titleOf(main)}</h2>
                    <p className="text-white/80 line-clamp-2">{excerptOf(main)}</p>
                  </div>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondary.map((a, i) => (
                <Link key={slugOf(a) + i} to={`/article/${slugOf(a)}`} className="block group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition">
                  <div className="relative aspect-video">
                    <img src={imgOf(a)} alt={titleOf(a)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 p-4 text-white">
                      <div className="inline-flex px-2 py-0.5 rounded bg-insightRed text-white text-[10px] font-bold mb-2">{categoryOf(a)}</div>
                      <h3 className="text-xl font-bold leading-snug line-clamp-2">{titleOf(a)}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Headlines list */}
            <div className="bg-gray-50 rounded-xl border border-gray-200">
              <div className="px-5 py-3 border-b border-gray-200 font-semibold uppercase tracking-wide text-sm text-insightBlack">Latest Headlines</div>
              <ul className="divide-y divide-gray-200">
                {headlines.map((a, i) => (
                  <li key={slugOf(a) + i} className="p-4 hover:bg-white transition">
                    <Link to={`/article/${slugOf(a)}`} className="flex items-start gap-4 group">
                      <span className="mt-1 inline-block w-6 h-6 rounded-full bg-insightRed/10 text-insightRed text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold group-hover:text-insightRed line-clamp-2">{titleOf(a)}</h4>
                        <div className="text-xs text-gray-500 mt-1">{dateOf(a)}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-insightRed" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right rail: promos/subscribe */}
          <aside className="order-3 space-y-8">
            <div className="rounded-xl border border-gray-200 p-6 bg-white text-center shadow-sm">
              <h3 className="text-xl font-bold mb-2">Get the Weekly Brief</h3>
              <p className="text-gray-600 mb-4">Curated insights for C‑suite leaders.</p>
              <Link to="/contact" className="inline-flex items-center px-4 py-2 rounded-md bg-insightRed text-white font-medium hover:bg-insightRed/90">Subscribe</Link>
            </div>
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <div className="h-36 bg-gradient-to-br from-insightRed/10 to-transparent" />
              <div className="p-5">
                <h4 className="font-semibold mb-1">Editor’s Choice</h4>
                <p className="text-sm text-gray-600">Hand‑picked stories on leadership and growth.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default EditorialFrontPage;
