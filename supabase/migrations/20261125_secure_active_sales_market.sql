-- Active sales market: expose only explicitly market-listed pigeon fields.
create or replace function public.get_active_sales_market()
returns table (
  listing_id uuid,
  seller_id uuid,
  seller_name text,
  seller_location text,
  pigeon_id uuid,
  ring_number text,
  pigeon_name text,
  sex text,
  color text,
  hatch_date date,
  price_type text,
  price numeric,
  listed_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    sl.id,
    sl.owner_id,
    b.display_name,
    b.location_label,
    p.id,
    p.ring_number,
    p.name,
    p.sex,
    p.color,
    p.hatch_date,
    sl.price_type,
    sl.price,
    sl.created_at
  from public.sales_listings as sl
  join public.pigeons as p
    on p.id = sl.pigeon_id
   and p.owner_id = sl.owner_id
  join public.breeders as b
    on b.id = sl.owner_id
  where sl.status = 'active'
    and p.pigeon_status = 'in_loft'
    and b.status = 'approved'
    and public.is_taba_approved()
  order by sl.created_at desc;
$$;

revoke all on function public.get_active_sales_market() from public;
revoke all on function public.get_active_sales_market() from anon;
grant execute on function public.get_active_sales_market() to authenticated;
