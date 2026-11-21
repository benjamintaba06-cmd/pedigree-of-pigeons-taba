-- TABA Push-Erinnerungen
-- Vor dem Ausführen in Supabase Vault zwei Secrets anlegen:
--   taba_project_url       = https://zntuhivibdibocuarewa.supabase.co
--   taba_push_cron_secret  = derselbe Wert wie TABA_PUSH_CRON_SECRET
-- Danach diesen Job einmalig ausführen.

select cron.schedule(
  'taba-send-due-push-reminders',
  '* * * * *',
  $job$
    select net.http_post(
      url := (select decrypted_secret from vault.decrypted_secrets where name = 'taba_project_url')
             || '/functions/v1/taba-send-push',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-taba-cron-secret',
        (select decrypted_secret from vault.decrypted_secrets where name = 'taba_push_cron_secret')
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 10000
    ) as request_id;
  $job$
);
