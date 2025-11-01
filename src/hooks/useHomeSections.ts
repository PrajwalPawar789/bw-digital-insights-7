import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HomeSectionItem {
  id: string;
  section_id: string;
  title: string;
  summary: string | null;
  article_slug: string | null;
  image_url: string | null;
  badge: string | null;
  action_label: string | null;
  action_url: string | null;
  featured: boolean;
  order_index: number;
  created_at: string | null;
}

export interface HomeSection {
  id: string;
  internal_name: string;
  kicker: string | null;
  title: string;
  subtitle: string | null;
  layout_type: string;
  category_id: string | null;
  accent_color: string | null;
  background_image_url: string | null;
  action_label: string | null;
  action_url: string | null;
  order_index: number;
  created_at: string | null;
  home_section_items?: HomeSectionItem[];
}

export const useHomeSections = () => {
  return useQuery<HomeSection[]>({
    queryKey: ["home_sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("home_sections")
        .select("*, home_section_items(*)")
        .order("order_index", { ascending: true })
        .order("order_index", { ascending: true, foreignTable: "home_section_items" });

      if (error) throw error;
      return (data || []).map((section) => ({
        ...section,
        home_section_items: (section.home_section_items || []).sort((a, b) => a.order_index - b.order_index),
      }));
    },
  });
};
