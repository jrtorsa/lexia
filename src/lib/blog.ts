// src/lib/blog.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  category: string;
  specialty_slug: string;
  specialty_label: string;
  published_at: string;
  reading_time: number;
  excerpt: string;
  content: string;
  estado: string;
  imagen_url: string | null;        
  publicado_facebook: boolean;      
  publicado_facebook_at: string | null; 
}

// Todos los artículos publicados
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .eq("estado", "publicado")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }

  return (data as BlogPost[]) || [];
}

// Un artículo por slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .eq("slug", slug)
    .eq("estado", "publicado")
    .single();

  if (error) return null;
  return data as BlogPost;
}

// Artículos por especialidad
export async function getPostsBySpecialty(
  specialtySlug: string,
  limit = 3
): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .eq("specialty_slug", specialtySlug)
    .eq("estado", "publicado")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data as BlogPost[]) || [];
}

// Todos los slugs publicados
export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("articulos")
    .select("slug")
    .eq("estado", "publicado");

  if (error) return [];
  return (data || []).map((r: { slug: string }) => r.slug);
}