package com.quartz;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.org.copart.lta.service.LTAServiceImpl;

public class QuartzJob implements Job {
        public void execute(JobExecutionContext context)
                        throws JobExecutionException {
        	new LTAServiceImpl().ApproveAllPendingSickLeave();
        }
}